import { useAuth } from "../../../hooks/useAuth";
import { getUserId } from "../../users/utils/userProfileAdapter";
import { useUserSuggestions } from "../../users/hooks/useUserSuggestions";
import { UserSuggestionsList } from "../../users/components/UserSuggestionsList";

export function FeedEmptySuggestions() {
    const { user } = useAuth();
    const currentUserId = getUserId(user);
    const suggestionsState = useUserSuggestions({ currentUserId });

    return <UserSuggestionsList suggestionsState={suggestionsState} compact />;
}
