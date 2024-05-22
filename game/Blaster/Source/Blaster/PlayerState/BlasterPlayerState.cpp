#include "PlayerState/BlasterPlayerState.h"
#include "Character/BlasterCharacter.h"
#include "Net/UnrealNetwork.h"
#include "PlayerController/BlasterPlayerController.h"
/*
ABlasterCharacter* ABlasterPlayerState::GetCharacter()
{
    return Character.IsValid() ? Character.Get() : nullptr;
}

ABlasterPlayerController* ABlasterPlayerState::GetController()
{
    return Controller.IsValid() ? Controller.Get() : nullptr;
}
*/

ABlasterCharacter* ABlasterPlayerState::GetCharacter()
{
    if (!Character.IsValid())
    {
        Character = Cast<ABlasterCharacter>(GetPawn());
    }
    return Character.Get();
}

ABlasterPlayerController* ABlasterPlayerState::GetController()
{
    if (!Controller.IsValid())
    {
        ABlasterCharacter* BlasterCharacter = GetCharacter();
        if (BlasterCharacter)
        {
            Controller = Cast<ABlasterPlayerController>(BlasterCharacter->Controller);
        }
    }
    return Controller.Get();
}

void ABlasterPlayerState::UpdateScoreOnHUD()
{
    if (const auto PlayerController = GetController())
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
    UpdateScoreOnHUD();  // 서버에서 HUD 업데이트
    if (HasAuthority())  // 서버에서만 실행
    {
        OnRep_Score();
    }
}

void ABlasterPlayerState::UpdateDefeatsOnHUD()
{
    if (const auto PlayerController = GetController())
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
    UpdateDefeatsOnHUD();  // 서버에서 HUD 업데이트
    if (HasAuthority())  // 서버에서만 실행
    {
        OnRep_Defeats();
    }
}

void ABlasterPlayerState::OnRep_Defeats()
{
    UpdateDefeatsOnHUD();  // 클라이언트에서 HUD 업데이트
}

void ABlasterPlayerState::OnRep_Score()
{
    Super::OnRep_Score();
    UpdateScoreOnHUD();  // 클라이언트에서 HUD 업데이트
}

void ABlasterPlayerState::SetMatchDuration(float Duration)
{
    MatchDuration = Duration;
}

void ABlasterPlayerState::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
    Super::GetLifetimeReplicatedProps(OutLifetimeProps);
    DOREPLIFETIME(ABlasterPlayerState, Defeats);
}