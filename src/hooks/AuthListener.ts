import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAuthStore } from "../store/AuthStore";

function AuthListener() {
    const { user, isSignedIn, isLoaded } = useUser();
    const { createProfile, fetchProfile, profile } = useAuthStore();
    
    // Use a Ref to track if we've already attempted a sync this session
    const hasSynced = useRef(false);

    useEffect(() => {
        const syncUser = async () => {
            // 1. Guard: Wait for Clerk
            if (!isLoaded) return;

            // 2. Guard: If not signed in or already synced/syncing, stop.
            if (!isSignedIn || !user || hasSynced.current || profile) return;

            try {
                hasSynced.current = true; // Mark as started immediately to prevent double-calls
                console.log("🔄 Syncing user profile...");
                
                await createProfile();
                await fetchProfile();
                
                console.log("✅ Profile synced successfully");
            } catch (error) {
                hasSynced.current = false; // Reset on error so it can retry
                console.error("❌ Error syncing user:", error);
            }
        };

        syncUser();
        
        // Only depend on the user's ID. When the ID changes (login/logout), 
        // the effect will re-evaluate.
    }, [isLoaded, isSignedIn, user?.id, createProfile, fetchProfile, profile]);

    return null;
}

export default AuthListener;