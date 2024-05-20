#include "PlayerState/BlasterPlayerState.h"
#include "Character/BlasterCharacter.h"
#include "Net/UnrealNetwork.h"
#include "PlayerController/BlasterPlayerController.h"

ABlasterCharacter* ABlasterPlayerState::GetCharacter()
{
    return Character.IsValid() ? Character.Get() : nullptr;
}

ABlasterPlayerController* ABlasterPlayerState::GetController()
{
    return Controller.IsValid() ? Controller.Get() : nullptr;
}

void ABlasterPlayerState::UpdateScoreOnHUD()
{
    if (const auto& PlayerController = GetController())
    {
        if (PlayerController->IsLocalController())
        {   
            PlayerController->SetHUDScore(GetScore());
        }
    }
}

void ABlasterPlayerState::AddToScore(const float ScoreAmount)
{
    SetScore(GetScore() + ScoreAmount);
    UpdateScoreOnHUD();
}

void ABlasterPlayerState::UpdateDefeatsOnHUD()
{
    if (const auto& PlayerController = GetController())
    {
        if (PlayerController->IsLocalController())
        {
            PlayerController->SetHUDDefeats(Defeats);
        }
    }
}

void ABlasterPlayerState::AddToDefeats(const int32 DefeatsAmount)
{
    Defeats += DefeatsAmount;
    UpdateDefeatsOnHUD();
}

void ABlasterPlayerState::OnRep_Defeats()
{
    UpdateDefeatsOnHUD();
}

void ABlasterPlayerState::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
    Super::GetLifetimeReplicatedProps(OutLifetimeProps);

    DOREPLIFETIME(ABlasterPlayerState, Defeats);
}

void ABlasterPlayerState::OnRep_Score()
{
    Super::OnRep_Score();

    UpdateScoreOnHUD();
}

void ABlasterPlayerState::SetMatchDuration(float Duration)
{
    MatchDuration = Duration;
}
