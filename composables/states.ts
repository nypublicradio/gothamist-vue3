export const useSensitiveContent = () => useState<boolean>('sensitiveContent', () => false)
export const useMembershipStatus = () => useState<string>('membershipStatus', () => 'status-unknown')