import { getProfile } from "@/lib/profile/getProfile";
import { GetUseProfileProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = (props: GetUseProfileProps) =>
  useQuery({
    queryKey: [`profile-${props.address}`],
    enabled: !!props.address,
    refetchOnWindowFocus: false,
    queryFn: () => getProfile({ address: props.address }),
  });
