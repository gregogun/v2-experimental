export const followProcessCode = `
Followers = Followers or {}
Following = Following or {}

local function isAlreadyFollowing(followee)
    return Following[followee] ~= nil
end

local function isFollowed(follower)
    return Followers[follower] ~= nil
end

Handlers.add(
"follow",
Handlers.utils.hasMatchingTag("Action", "Follow"),
function (msg)
    local Target = msg.Data
    local Receiver = msg.Target
    local Sender = msg.From

    -- If the sender is the owner of the process and the Data field is missing, it's an invalid request
    if Sender == Receiver and not Target then
    Handlers.utils.reply("Error: Missing target user to follow.")(msg)
    return
    end

    -- If the sender is not the owner of the process, add the sender as a follower
    if Sender ~= Receiver then
    local FollowerID = Sender -- The process ID of the user who wants to follow
    if not isFollowed(FollowerID) then
        Followers[FollowerID] = true
        Handlers.utils.reply("Added follower " .. FollowerID)(msg)
    else
        Handlers.utils.reply("Error: " .. FollowerID .. " is already a follower.")(msg)
    end
    return -- Return early to prevent further processing
    end

    -- If the sender is the owner of the process and the Data field is present, the process is trying to follow another user
    -- Prevent following oneself
    if Receiver == Target then
    Handlers.utils.reply("Error: You cannot follow yourself.")(msg)
    return
    end
    -- Check if the current process is already following the target user
    if not isAlreadyFollowing(Target) then
    Following[Target] = true
    -- Send a message to the target user's process to add the current process as a follower
    ao.send({Target = Target, Action = "Follow", From = Receiver})
    Handlers.utils.reply("You are now following " .. Target)(msg)
    else
    Handlers.utils.reply("Error: You are already following " .. Target)(msg)
    end
end
)

Handlers.add(
"unfollow",
Handlers.utils.hasMatchingTag("Action", "Unfollow"),
function (msg)
    local Target = msg.Data
    local Receiver = msg.Target
    local Sender = msg.From

    -- If the sender is the owner of the process and the Data field is missing, it's an invalid request
    if Sender == Receiver and not Target then
    Handlers.utils.reply("Error: Missing target user to unfollow.")(msg)
    return
    end

    -- If the sender is not the owner of the process, remove the sender from the Followers list
    if Sender ~= Receiver then
    local FollowerID = Sender -- The process ID of the user who wants to unfollow
    if isFollowed(FollowerID) then
        Followers[FollowerID] = nil
        Handlers.utils.reply("Removed follower " .. FollowerID)(msg)
    else
        Handlers.utils.reply("Error: " .. FollowerID .. " is not a follower.")(msg)
    end
    return -- Return early to prevent further processing
    end

    -- If the sender is the owner of the process and the Data field is present, the process is trying to unfollow another user
    -- Check if the current process is actually following the target user
    if isAlreadyFollowing(Target) then
    Following[Target] = nil
    -- Send a message to the target user's process to remove the current process from their Followers list
    ao.send({Target = Target, Action = "Unfollow", From = Receiver})
    Handlers.utils.reply("You have stopped following " .. Target)(msg)
    else
    Handlers.utils.reply("Error: You are not following " .. Target)(msg)
    end
end
)

Handlers.add(
  "getFollowers",
  Handlers.utils.hasMatchingTag("Action", "GetFollowers"),
  function (msg)
    local followersList = {}
    for followerID, _ in pairs(Followers) do
      table.insert(followersList, followerID)
    end
    Handlers.utils.reply(table.concat(followersList, ", "))(msg)
  end
)

Handlers.add(
  "getFollowing",
  Handlers.utils.hasMatchingTag("Action", "GetFollowing"),
  function (msg)
    local followingList = {}
    for followeeID, _ in pairs(Following) do
      table.insert(followingList, followeeID)
    end
    Handlers.utils.reply(table.concat(followingList, ", "))(msg)
  end
)

Handlers.add(
  "isFollowing",
  Handlers.utils.hasMatchingTag("Action", "IsFollowing"),
  function (msg)
    if not msg.Data then
      Handlers.utils.reply("Error: No user ID provided")(msg)
      return
    end
    local Target = msg.Data
    local isFollowingResponse = isAlreadyFollowing(Target) and "true" or "false"
    Handlers.utils.reply(isFollowingResponse)(msg)
  end
)

Handlers.add(
  "isFollower",
  Handlers.utils.hasMatchingTag("Action", "IsFollower"),
  function (msg)
    if not msg.Data then
      Handlers.utils.reply("Error: No user ID provided")(msg)
      return
    end
    local Target = msg.Data
    local isFollowerResponse = isFollowed(Target) and "true" or "false"
    Handlers.utils.reply(isFollowerResponse)(msg)
  end
)
`;
