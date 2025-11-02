"use client";

interface ClubHistoryProps {
    history: string;
}

export default function ClubHistory({ history }: ClubHistoryProps) {
    return (
        <div className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Club History</h2>
            
            <div className="prose max-w-none">
                <p className="leading-relaxed text-lg text-white/85">{history}</p>
            </div>
        </div>
    );
}