
import { useUserProfile } from "@/hooks/useUserProfile";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { SavedProductsTab } from "@/components/profile/SavedProductsTab";
import { ReviewsTab } from "@/components/profile/ReviewsTab";
import { SubmissionsTab } from "@/components/profile/SubmissionsTab";
import { StacksTab } from "@/components/profile/StacksTab";
import { SettingsTab } from "@/components/profile/SettingsTab";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfile() {
  const {
    userProfile,
    savedProducts,
    reviews,
    stacks,
    submissions,
    settings,
    loading,
    activeTab,
    saveSortOption,
    setActiveTab,
    setSaveSortOption,
    updateUserProfile,
    updateSettings,
    removeSavedProduct,
    deleteReview,
    deleteStack,
    toggleStackVisibility,
  } = useUserProfile();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <LoadingState />
          ) : (
            userProfile && (
              <>
                <ProfileHeader 
                  userProfile={userProfile} 
                  onUpdateProfile={updateUserProfile} 
                />
                
                <ProfileTabs 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                  stats={userProfile.stats} 
                />
                
                {activeTab === "saved" && (
                  <SavedProductsTab 
                    products={savedProducts} 
                    sortOption={saveSortOption} 
                    onSortChange={setSaveSortOption} 
                    onRemoveProduct={removeSavedProduct} 
                  />
                )}
                
                {activeTab === "reviews" && (
                  <ReviewsTab 
                    reviews={reviews} 
                    onDeleteReview={deleteReview} 
                  />
                )}
                
                {activeTab === "submissions" && (
                  <SubmissionsTab 
                    submissions={submissions} 
                  />
                )}
                
                {activeTab === "stacks" && (
                  <StacksTab 
                    stacks={stacks} 
                    onToggleVisibility={toggleStackVisibility} 
                    onDeleteStack={deleteStack} 
                  />
                )}
                
                {activeTab === "settings" && settings && (
                  <SettingsTab 
                    settings={settings} 
                    username={userProfile.username} 
                    avatarUrl={userProfile.avatarUrl} 
                    onUpdateSettings={updateSettings} 
                  />
                )}
              </>
            )
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function LoadingState() {
  return (
    <>
      {/* Skeleton for profile header */}
      <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-20 w-full max-w-lg" />
          </div>
          <div className="flex gap-4">
            <div className="space-y-1">
              <Skeleton className="h-8 w-8 mx-auto" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-8 w-8 mx-auto" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-8 w-8 mx-auto" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Skeleton for tabs */}
      <div className="mb-8">
        <Skeleton className="h-10 w-full" />
      </div>
      
      {/* Skeleton for content */}
      <div className="space-y-6">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </>
  );
}
