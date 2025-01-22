'use client'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ChartConfig, ChartContainer } from '../ui/chart'

interface UsersTotalCardProps {
  data: { month: string; users: string }[]
}

export default function UsersTotalCard({ data }: UsersTotalCardProps) {
  const t = useTranslations()

  const chartData = data?.map((item) => {
    return {
      month: item.month,
      users: parseInt(item.users),
    }
  })

  const chartConfig = {
    users: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig

  const percentage =
    chartData.length >= 2
      ? parseInt(
          (
            ((chartData[chartData.length - 2].users -
              chartData[chartData.length - 1].users) /
              chartData[chartData.length - 2].users) *
            100
          )?.toString()
        )
      : 0

  const isDown = percentage < 0
  const total = chartData?.reduce((total, item) => total + item.users, 0)

  return (
    <Card className="w-full !border-utility-gray-200">
      <CardHeader className="items-start pb-0 px-4 py-4">
        <CardTitle className="text-base font-medium text-utility-gray-600">
          {t('charts.users-total')}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-5 max-sm:grid-cols-2 justify-between gap-4 items-end">
          <div className="flex flex-col col-span-3 max-sm:col-span-1">
            <div className="flex gap-2">
              <p className="text-xl font-semibold text-utility-gray-800">
                {Intl.NumberFormat('fr-FR', {
                  style: 'decimal',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(total || '0')}
              </p>
              <div className="flex gap-1 items-center">
                {isDown ? (
                  <TrendingDown className="text-utility-error-500 w-3 h-3" />
                ) : (
                  <TrendingUp className="text-utility-success-500 w-3 h-3" />
                )}

                <p
                  className={cn(
                    'text-xs font-medium text-utility-success-500',
                    isDown && 'text-utility-error-500'
                  )}
                >
                  {percentage}%
                </p>
              </div>
            </div>
            <p className="text-xs font-light text-utility-gray-500">
              {t('charts.subtitle')}
            </p>
          </div>
          <div className="col-span-2 max-sm:col-span-1 h-full w-full flex items-end">
            <div className="relative h-fit w-full">
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 0,
                  }}
                >
                  <Area
                    dataKey="users"
                    type="natural"
                    fill={
                      isDown
                        ? 'var(--utility-error-300)'
                        : 'var(--utility-success-300)'
                    }
                    fillOpacity={0.4}
                    stroke={
                      isDown
                        ? 'var(--utility-error-500)'
                        : 'var(--utility-success-500)'
                    }
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
