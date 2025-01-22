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

interface RevenueChartProps {
  data: { month: string; platformFee: string; stripeFee: string }[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const t = useTranslations()

  const chartData = data?.map((item) => {
    return {
      month: item.month,
      platformFee: parseInt(item.platformFee) / 100,
      stripeFee: parseInt(item.stripeFee) / 100,
    }
  })

  const chartConfig = {
    reservations: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
    platformFee: {
      label: t('charts.revenue-platform'),
    },
    stripeFee: {
      label: t('charts.revenue-stripe'),
    },
  } satisfies ChartConfig

  return (
    <Card className="w-full !border-utility-gray-200">
      <CardHeader className="items-start pb-0 px-4 py-4">
        <CardTitle className="text-base font-medium text-utility-gray-600">
          {t('charts.revenue-total')}
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
                <linearGradient id="fillPlatform" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--utility-gray-blue-500)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--utility-gray-blue-500)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillStripe" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--utility-gray-blue-300)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--utility-gray-blue-300)"
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
                dataKey="platformFee"
                type="natural"
                fill="url(#fillPlatform)"
                stroke="var(--utility-gray-blue-500)"
                stackId="a"
              />
              <Area
                dataKey="stripeFee"
                type="natural"
                fill="url(#fillStripe)"
                stroke="var(--utility-gray-blue-300)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
