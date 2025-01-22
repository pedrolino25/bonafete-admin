'use client'
import { useTranslations } from 'next-intl'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

interface PartyTypesChartProps {
  data: { partyTypeId: string; total: string }[]
}

export default function PartyTypesChart({ data }: PartyTypesChartProps) {
  const t = useTranslations()

  const chartData = data?.map((item) => {
    return {
      partyType: t(`charts.party.${item.partyTypeId}`),
      total: parseInt(item.total),
    }
  })

  const chartConfig = {
    amount: {
      label: t('charts.quantity'),
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig

  return (
    <Card className="w-full h-full !border-utility-gray-200">
      <CardHeader className="items-start pb-0 px-4 py-4">
        <CardTitle className="text-base font-medium text-utility-gray-600">
          {t('charts.party-types')}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="mx-auto w-full h-full">
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" radialLines={false} />
            <PolarAngleAxis dataKey="partyType" />
            <Radar
              dataKey="total"
              fill="var(--utility-gray-700)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
