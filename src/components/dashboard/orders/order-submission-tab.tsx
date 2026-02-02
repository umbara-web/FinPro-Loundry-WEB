'use client';

import { PickupAddressStep } from '@/src/components/dashboard/pickup/pickup-address-step';
import { PickupScheduleStep } from '@/src/components/dashboard/pickup/pickup-schedule-step';
import { PickupOutletStep } from '@/src/components/dashboard/pickup/pickup-outlet-step';
import { PickupSummary } from '@/src/components/dashboard/pickup/pickup-summary';
import { PickupProgress } from '@/src/components/dashboard/pickup/pickup-progress';
import { useCreatePickup } from '@/src/hooks/use-create-pickup';
import { PickupItemsStep } from '../pickup/pickup-items-step';

export function OrderSubmissionTab() {
  const {
    selectedAddress,
    setSelectedAddress,
    date,
    setDate,
    timeSlot,
    setTimeSlot,
    notes,
    setNotes,
    handleSubmit,
    isLoading,
    progress,
    currentStep,
    stepName,
    nearestOutlet,
    isOutletLoading,
    items,
    manualItems,
    handleUpdateItem,
    handleAddManualItem,
    handleUpdateManualItemQuantity,
    handleRemoveManualItem,
  } = useCreatePickup();

  return (
    <div className='flex w-full flex-col pr-5 pb-40'>
      <div className='mb-8'>
        <PickupProgress
          currentStep={currentStep}
          totalSteps={4}
          stepName={stepName}
          progress={progress}
        />
      </div>
      <div className='relative flex flex-col gap-8 lg:flex-row'>
        <div className='flex flex-1 flex-col gap-8'>
          <PickupAddressStep
            selectedAddressId={selectedAddress?.id}
            onSelect={setSelectedAddress}
          />
          <PickupScheduleStep
            date={date}
            setDate={setDate}
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
          />
          <PickupItemsStep
            items={items}
            onUpdateItem={handleUpdateItem}
            manualItems={manualItems}
            onAddManualItem={handleAddManualItem}
            onUpdateManualItem={handleUpdateManualItemQuantity}
            onRemoveManualItem={handleRemoveManualItem}
          />
          <PickupOutletStep selectedAddress={selectedAddress} />
        </div>
        <div className='flex flex-col gap-6 lg:w-95'>
          <PickupSummary
            selectedAddress={selectedAddress}
            date={date}
            timeSlot={timeSlot}
            nearestOutlet={nearestOutlet}
            isOutletLoading={isOutletLoading}
            notes={notes}
            setNotes={setNotes}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            items={items}
            manualItems={manualItems}
          />
        </div>
      </div>
    </div>
  );
}
