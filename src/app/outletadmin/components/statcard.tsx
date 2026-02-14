
import { Calendar, Clock, RefreshCcw, CheckCircle2 } from "lucide-react";
import { Stat } from "@/src/app/outletadmin/types";

const ICONS = {
    calendar: <Calendar size={18} />,
    clock: <Clock size={18} />,
    refresh: <RefreshCcw size={18} />,
    check: <CheckCircle2 size={18} />
};

export default function StatCard({ title, value, trend, subtitle, icon, iconColor }: Stat) {
    return (
        <div className="bg-[#1E1E1E] border border-gray-800 p-5 rounded-2xl relative overflow-hidden">
            <p className="text-xs font-medium text-gray-400 mb-2">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
            {trend ? (
                <p className="text-[10px] text-green-500 mt-2 font-medium">↗ {trend}</p>
            ) : (
                <p className="text-[10px] text-gray-500 mt-2">{subtitle}</p>
            )}
            <div className={`absolute top-5 right-5 p-2 rounded-lg bg-opacity-10 bg-current ${iconColor}`}>
                {ICONS[icon]}
            </div>
        </div>
    );
}