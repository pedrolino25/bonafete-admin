'use client'
import { useTranslations } from 'next-intl'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

interface ReservationsChartProps {
  data: { month: string; reservations: string }[]
}

export default function ReservationsChart({ data }: ReservationsChartProps) {
  const t = useTranslations()

  const chartData = data?.map((item) => {
    return {
      month: item.month,
      reservations: parseInt(item.reservations),
    }
  })

  const chartConfig = {
    reservations: {
      label: t('charts.reservations-confirm'),
    },
  } satisfies ChartConfig

  return (
    <Card className="w-full h-full !border-utility-gray-200">
      <CardHeader className="items-start pb-0 px-4 py-4">
        <CardTitle className="text-base font-medium text-utility-gray-600">
          {t('charts.reservations-total')}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="w-full h-fit">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillConfirmed" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--utility-success-700)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--utility-success-700)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="reservations"
                type="natural"
                fill="url(#fillConfirmed)"
                stroke="var(--utility-success-700)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
