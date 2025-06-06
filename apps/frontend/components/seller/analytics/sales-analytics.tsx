"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	TimeRange,
	mockSalesData,
} from "@/lib/mocks/seller/sales-analytics.mock";
import { useTranslations } from "next-intl";
import { CategoryChart } from "./category-chart";
import { SalesChart } from "./sales-chart";
import { StatsCards } from "./stats-cards";

export function SalesAnalytics() {
	const t = useTranslations();
	const timeRanges: TimeRange[] = [
		"Monthly",
		"Quarterly",
		"Yearly",
		"All Time",
	];

	return (
		<Tabs defaultValue="Monthly" className="space-y-4">
			<TabsList className="overflow-x-auto flex-nowrap">
				{timeRanges.map((range) => (
					<TabsTrigger key={range} value={range} className="whitespace-nowrap">
						{t(`Sales.analytics.timeRanges.${range}`)}
					</TabsTrigger>
				))}
			</TabsList>
			{timeRanges.map((range) => (
				<TabsContent key={range} value={range} className="space-y-4">
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
						<StatsCards data={mockSalesData[range]} />
					</div>
					<div className="grid grid-cols-1 gap-4">
						<div className="w-full">
							<SalesChart
								data={mockSalesData[range].salesByDay}
								timeRange={range}
							/>
						</div>
						<div className="w-full">
							<CategoryChart
								data={mockSalesData[range].categorySales}
								timeRange={range}
							/>
						</div>
					</div>
				</TabsContent>
			))}
		</Tabs>
	);
}
