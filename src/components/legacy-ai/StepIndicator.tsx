import { motion } from 'framer-motion';

interface StepIndicatorProps {
    currentStep: number;
    steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-center gap-2 mb-10 w-full max-w-2xl mx-auto">
            {steps.map((step, index) => {
                const isActive = index + 1 === currentStep;
                const isCompleted = index + 1 < currentStep;

                return (
                    <div key={index} className="flex-1 flex flex-col items-center relative">
                        {/* Connecting Line */}
                        {index !== steps.length - 1 && (
                            <div className="absolute top-4 left-1/2 w-full h-[2px] bg-stone-100 -z-10">
                                <div
                                    className={`h-full bg-stone-900 transition-all duration-500 ease-out ${isCompleted ? 'w-full' : 'w-0'}`}
                                />
                            </div>
                        )}

                        {/* Step Circle */}
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 z-10 
                            ${isActive ? 'bg-stone-900 text-white scale-110 shadow-lg' :
                                    isCompleted ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}
                        >
                            {isCompleted ? '✓' : index + 1}
                        </div>

                        {/* Step Label */}
                        <span className={`text-[10px] font-bold mt-2 uppercase tracking-tight transition-colors duration-300
                            ${isActive ? 'text-stone-900' : 'text-stone-400'}`}>
                            {step}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default StepIndicator;
