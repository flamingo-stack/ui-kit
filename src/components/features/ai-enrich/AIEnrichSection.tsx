'use client'

import React from 'react'
import { cn } from '../../../utils/cn'
import { SparklesIcon } from '../../icons/sparkles-icon'
import { AIEnrichButton } from './AIEnrichButton'
import { AIWarningsSection } from './AIWarningsSection'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { CheckCircle, AlertCircle } from 'lucide-react'

export interface ConfidenceField {
  label: string
  key: string
  confidence?: number
}

export interface AIEnrichSectionProps {
  // Button state
  onEnrich: () => void
  loading?: boolean
  disabled?: boolean
  canEnrich?: boolean

  // Status
  status?: 'idle' | 'loading' | 'success' | 'error'
  statusMessage?: string
  overallConfidence?: number

  // Warnings
  warnings?: string[]

  // Confidence fields to display (optional - shown as simple list)
  confidenceFields?: ConfidenceField[]

  // Custom content (like created tags info)
  children?: React.ReactNode

  // Actions
  onClear?: () => void
  showClearButton?: boolean

  // Labels
  title?: string
  buttonLabel?: string
  loadingLabel?: string
  disabledMessage?: string

  // Styling
  variant?: 'default' | 'compact'
  className?: string
}

export const AIEnrichSection: React.FC<AIEnrichSectionProps> = ({
  onEnrich,
  loading = false,
  disabled = false,
  canEnrich = true,
  status,
  statusMessage,
  overallConfidence,
  warnings,
  confidenceFields,
  children,
  onClear,
  showClearButton = true,
  title = 'AI Enrichment',
  buttonLabel = 'AI Enrich',
  loadingLabel = 'Enriching...',
  disabledMessage = 'Fill in required fields to enable AI enrichment.',
  variant = 'default',
  className,
}) => {
  const hasResults = status === 'success' || status === 'error'
  const shouldDisable = disabled || !canEnrich

  return (
    <div
      className={cn(
        'rounded-lg bg-ods-card border border-ods-border',
        variant === 'default' ? 'p-6 space-y-4' : 'p-4 space-y-3',
        className
      )}
    >
      {/* Header with button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SparklesIcon size={20} className="text-ods-text-secondary" />
          <h3 className="font-['Azeret_Mono'] text-[18px] font-semibold uppercase text-ods-text-primary">
            {title}
          </h3>
        </div>
        <AIEnrichButton
          onClick={onEnrich}
          loading={loading}
          disabled={shouldDisable}
          label={buttonLabel}
          loadingLabel={loadingLabel}
          size="md"
        />
      </div>

      {/* Disabled message */}
      {shouldDisable && !loading && (
        <p className="text-ods-text-secondary text-sm font-['DM_Sans']">
          {disabledMessage}
        </p>
      )}

      {/* Results section */}
      {hasResults && (
        <div className="space-y-4">
          {/* Status indicator - simple and clean */}
          <div className={cn(
            'flex items-center gap-3 p-3 rounded-lg',
            status === 'success' ? 'bg-[--ods-attention-green-success]/10' : 'bg-[--ods-attention-red-error]/10'
          )}>
            {status === 'success' ? (
              <CheckCircle className="h-5 w-5 text-[--ods-attention-green-success]" />
            ) : (
              <AlertCircle className="h-5 w-5 text-[--ods-attention-red-error]" />
            )}
            <span className={cn(
              'text-sm font-medium',
              status === 'success' ? 'text-[--ods-attention-green-success]' : 'text-[--ods-attention-red-error]'
            )}>
              {statusMessage || (status === 'success' ? 'Enrichment complete' : 'Enrichment failed')}
            </span>
            {overallConfidence !== undefined && status === 'success' && (
              <Badge variant="success" className="ml-auto">
                {overallConfidence}% confidence
              </Badge>
            )}
          </div>

          {/* Warnings */}
          {warnings && warnings.length > 0 && (
            <AIWarningsSection warnings={warnings} />
          )}

          {/* Custom children content (like created tags info) */}
          {children}

          {/* Clear button */}
          {showClearButton && onClear && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
            >
              Clear Results
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
