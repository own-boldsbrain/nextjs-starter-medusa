"use client"

/**
 * Yello Solar Hub - PanelCard Component
 * Domain-specific component for solar panel products
 */

import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button } from '@/lib/design-system/components';
import { formatPrice } from '@/lib/utils';

export interface PanelCardProps {
    panel: {
        id: string;
        manufacturer: string;
        model: string;
        power: number; // in watts
        efficiency: number; // percentage
        technology: string;
        price: number; // in cents
        image?: string;
        tier?: 'XPP' | 'PP' | 'P' | 'M' | 'G';
    };
    onViewDetails?: (panelId: string) => void;
    onAddToQuote?: (panelId: string) => void;
}

const tierColors = {
    XPP: 'bg-purple-100 text-purple-700 border-purple-300',
    PP: 'bg-blue-100 text-blue-700 border-blue-300',
    P: 'bg-green-100 text-green-700 border-green-300',
    M: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    G: 'bg-orange-100 text-orange-700 border-orange-300',
};

const PanelCardInner: React.FC<PanelCardProps> = ({ panel, onViewDetails, onAddToQuote }) => {
    const handleViewDetails = useCallback(() => onViewDetails?.(panel.id), [onViewDetails, panel.id]);
    const handleAddToQuote = useCallback(() => onAddToQuote?.(panel.id), [onAddToQuote, panel.id]);

    const formattedPrice = useMemo(() => formatPrice(panel.price), [panel.price]);

    return (
        <Card variant="default" interactive className="hover:shadow-yello transition-all duration-200 group">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {panel.tier && (
                            <Badge className={tierColors[panel.tier]}>
                                {panel.tier}
                            </Badge>
                        )}
                        <Badge variant="yellow" className="font-mono">
                            {panel.power}W
                        </Badge>
                    </div>
                    <div className="text-right">
                        <CardTitle className="text-lg">{panel.manufacturer}</CardTitle>
                        <CardDescription className="text-sm">{panel.model}</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {panel.image && (
                    <div className="relative aspect-video bg-gradient-yello rounded-lg overflow-hidden">
                        <Image
                            src={panel.image}
                            alt={`${panel.manufacturer} ${panel.model}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 640px) 100vw, 50vw"
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-geist-500">Eficiência</span>
                        <p className="font-medium">{panel.efficiency}%</p>
                    </div>
                    <div>
                        <span className="text-geist-500">Tecnologia</span>
                        <p className="font-medium">{panel.technology}</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-4 border-t border-geist-200">
                <div className="text-left">
                    <p className="text-2xl font-bold text-gradient-yello">{formattedPrice}</p>
                    <p className="text-xs text-geist-500">por unidade</p>
                </div>
                <div className="flex gap-2">
                    <Button yelloVariant="outline" size="sm" onClick={handleViewDetails}>
                        Detalhes
                    </Button>
                    <Button yelloVariant="primary" size="sm" onClick={handleAddToQuote}>
                        Adicionar
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const PanelCard = React.memo(PanelCardInner);
PanelCard.displayName = 'PanelCard';

export { PanelCard };