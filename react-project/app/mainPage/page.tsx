import Link from 'next/link'
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, AreaChart, CartesianGrid, Area, Tooltip, Legend, Line, LineChart } from "recharts"
import APIService, { PriceData, TradingPair } from '../api/cryptoCoinsService';
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
//https://api.coinbase.com/v2/prices/BTC-USD/historic?days=76

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
]



const MainPage = () => {
    const { toast } = useToast()

    const [btcPriceHistory, setBtcPriceHistory] = useState<PriceData[]>([]);
    const [products, setProductsArray] = useState<TradingPair[]>([]);

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const api = new APIService();



    useEffect(() => {
        const fetchData = async () => {
            try {


                const resProducts = await api.fetchProducts();
                setProductsArray(resProducts);

                await GetASingleCoin(api, resProducts[0].id, setBtcPriceHistory)


            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [toast]);
    return (
        <main>
            <Button
                onClick={() => {
                    toast({
                        title: "Scheduled: Catch up",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                    })
                }}
            >
                Show Toast
            </Button>



            <Card>
                <CardHeader>
                    <CardTitle>Historic btc prices</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}



                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? products.find((product) => product.id === value)?.display_name
                                    : "Select trading pair..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search trading pair..." />
                                <CommandEmpty>No trading pair found.</CommandEmpty>
                                <CommandGroup>
                                    {products.map((product) => (
                                        <CommandItem
                                            key={product.id}
                                            value={product.id}
                                            onSelect={async (currentValue) => {
                                                console.log(value)
                                                console.log(currentValue)
                                                setValue(currentValue === value ? "" : currentValue);

                                                await GetASingleCoin(api, currentValue, setBtcPriceHistory)


                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === product.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {product.display_name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>




                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                            width={730}
                            height={250}
                            data={btcPriceHistory}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#cc3333" // Set stroke color to primary color
                                fill="#cc3333" // Set fill color to primary color
                                name="BTC Price"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>



        </main>

    )
}

export default MainPage

async function GetASingleCoin(api: APIService, product: string, setBtcPriceHistory: React.Dispatch<React.SetStateAction<PriceData[]>>) {
    let res = await api.getBTCPrice(product, '1')
    setBtcPriceHistory(res)
}
