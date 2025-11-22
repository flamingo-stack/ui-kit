'use client'

import React from 'react'
import { Button } from '../../ui/button'
import { OnboardingStepCard } from './onboarding-step-card'
import { useOnboardingState, type OnboardingStepConfig } from '../../../hooks/ui/use-onboarding-state'
import { cn } from '../../../utils/cn'

export interface OnboardingWalkthroughProps {
  steps: OnboardingStepConfig[]
  onDismiss?: () => void
  storageKey?: string
  className?: string
  spacing?: string
  /**
   * Completion status from hook-based checks (e.g., useOnboardingCompletion)
   * Object mapping step IDs to boolean completion status
   */
  completionStatus?: Record<string, boolean>
  /**
   * Whether completion checks are still loading
   */
  isLoadingCompletion?: boolean
}

export function OnboardingWalkthrough({
  steps,
  onDismiss,
  storageKey = 'openframe-onboarding-state',
  className,
  spacing = 'space-y-4',
  completionStatus,
  isLoadingCompletion = false
}: OnboardingWalkthroughProps) {
  const {
    state,
    markComplete,
    markSkipped,
    dismissOnboarding,
    isStepComplete,
    isStepSkipped,
    allStepsComplete,
    markMultipleComplete
  } = useOnboardingState(storageKey)

  // Sync completion status from hooks to localStorage (only once after loading completes)
  React.useEffect(() => {
    if (!completionStatus || isLoadingCompletion) return

    const completedStepIds = Object.entries(completionStatus)
      .filter(([stepId, isComplete]) => isComplete && !isStepComplete(stepId))
      .map(([stepId]) => stepId)

    if (completedStepIds.length > 0) {
      console.log('📊 Auto-marking steps as complete from hook data:', completedStepIds)
      markMultipleComplete(completedStepIds)
    }
  }, [completionStatus, isLoadingCompletion, isStepComplete, markMultipleComplete])

  // Don't render if dismissed
  if (state.dismissed) {
    return null
  }

  const isAllComplete = allStepsComplete(steps)

  const handleDismiss = () => {
    dismissOnboarding()
    onDismiss?.()
  }

  const handleStepAction = async (step: OnboardingStepConfig) => {
    await step.onAction()

    // Auto-mark Knowledge Base as complete (no verification needed)
    if (step.id === 'knowledge-base') {
      console.log(`🎯 Auto-completing Knowledge Base`)
      markComplete(step.id)
      return
    }

    // For other steps, re-check completion after action
    if (step.checkComplete) {
      try {
        const isComplete = await step.checkComplete()
        console.log(`🔍 Post-action check for "${step.id}": isComplete=${isComplete}`)
        if (isComplete) {
          markComplete(step.id)
        }
      } catch (error) {
        console.error(`Error checking completion for "${step.id}":`, error)
      }
    }
  }

  const handleStepSkip = (step: OnboardingStepConfig) => {
    step.onSkip?.()
    markSkipped(step.id)
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Header - responsive: stacks on mobile */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
        <h2 className="font-['Azeret_Mono'] font-semibold text-[24px] leading-[32px] tracking-[-0.48px] text-ods-text-primary">
          Get Started
        </h2>

        {isLoadingCompletion ? (
          <div className="h-[40px] w-full md:w-[160px] bg-ods-border rounded-[6px] animate-pulse" />
        ) : isAllComplete ? (
          <Button
            variant="primary"
            onClick={handleDismiss}
            className="w-full md:w-auto"
          >
            Close Onboarding
          </Button>
        ) : (
          <Button
            variant="device-action"
            onClick={handleDismiss}
            className="w-full md:w-auto"
          >
            Skip Onboarding
          </Button>
        )}
      </div>

      {/* Step cards - no wrapper, direct rendering */}
      <div className={cn(spacing)}>
        {steps.map((step) => (
          <OnboardingStepCard
            key={step.id}
            step={step}
            isCompleted={isStepComplete(step.id)}
            isSkipped={isStepSkipped(step.id)}
            isCheckingCompletion={isLoadingCompletion}
            onAction={() => handleStepAction(step)}
            onSkip={() => handleStepSkip(step)}
          />
        ))}
      </div>
    </div>
  )
}
