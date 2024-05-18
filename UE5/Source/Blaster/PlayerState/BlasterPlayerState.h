#pragma once

#include "CoreMinimal.h"
#include "GameFramework/PlayerState.h"
#include "BlasterPlayerState.generated.h"

class ABlasterPlayerController;
class ABlasterCharacter;
class ABlasterGameMode;

UCLASS(Abstract)
class BLASTER_API ABlasterPlayerState final : public APlayerState
{
    GENERATED_BODY()

    /** Cached Character associated with the state. */
    UPROPERTY(Transient)
    TWeakObjectPtr<ABlasterCharacter> Character;

    /** Cached Controller associated with the state. */
    UPROPERTY(Transient)
    TWeakObjectPtr<ABlasterPlayerController> Controller;

public:
    UPROPERTY(BlueprintReadWrite, ReplicatedUsing = OnRep_Defeats)
    int32 Defeats{ 0 };

    /** Cached reference to the game mode. */
    UPROPERTY(BlueprintReadOnly, Transient, Category = "Game")
    ABlasterGameMode* GameMode{ nullptr };

protected:
    /** Match duration. */
    UPROPERTY(BlueprintReadWrite, Transient, Category = "Game")
    float MatchDuration{ 0.f };

public:
    /** Cache and return character associated with the state. */
    ABlasterCharacter* GetCharacter();

    /** Cache and return player controller associated with the state. */
    ABlasterPlayerController* GetController();

    void UpdateScoreOnHUD();

    void UpdateDefeatsOnHUD();

    UFUNCTION()
    void OnRep_Defeats();

public:
    void AddToScore(float ScoreAmount);
    void AddToDefeats(int32 DefeatsAmount);
    void SetMatchDuration(float Duration);

    int32 GetDefeats() const { return Defeats; }

    virtual void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;

    virtual void OnRep_Score() override;

    FORCEINLINE float GetMatchDuration() const { return MatchDuration; }
};
