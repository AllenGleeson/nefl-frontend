import Image from "next/image"

type StatRow = {
    rank: number
    team: string
    badge: string
    goals: number
}

type Props = {
    title: string
    rows: StatRow[]
}

export default function StatisticsTable({ title, rows }: Props) {
    return (
        <div className="overflow-x-auto rounded-2xl shadow-md border">
            <table className="w-full text-sm text-left text-gray-600">
                <caption className="p-4 text-lg font-semibold text-gray-900 bg-gray-100 border-b">
                    {title}
                </caption>
                <thead className="bg-gray-50 text-gray-700 text-sm uppercase">
                    <tr>
                        <th scope="col" className="px-4 py-3">Rank</th>
                        <th scope="col" className="px-4 py-3">Team</th>
                        <th scope="col" className="px-4 py-3 text-right">Goals</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr
                            key={idx}
                            className="border-t hover:bg-gray-50 transition"
                        >
                            <td className="px-4 py-3 font-medium">{row.rank}</td>
                            <td className="px-4 py-3 flex items-center gap-2">
                                <Image
                                    src={row.badge}
                                    alt={row.team}
                                    width={24}
                                    height={24}
                                />
                                <span>{row.team}</span>
                            </td>
                            <td className="px-4 py-3 text-right font-semibold">{row.goals}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}