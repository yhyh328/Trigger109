/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "RuleRangerDefaultEvents.h"
#include "Kismet2/KismetEditorUtilities.h"
#include "RuleRangerAction.h"

void FRuleRangerDefaultEvents::Initialize(FRuleRangerModule* Module)
{
    FKismetEditorUtilities::RegisterAutoGeneratedDefaultEvent(Module,
                                                              URuleRangerAction::StaticClass(),
                                                              GET_FUNCTION_NAME_CHECKED(URuleRangerAction, Apply));
}

void FRuleRangerDefaultEvents::Shutdown(FRuleRangerModule* Module)
{
    // Cleanup all auto generated event nodes created by this module
    FKismetEditorUtilities::UnregisterAutoBlueprintNodeCreation(Module);
}
