"use client";

import React from "react";
import { Button } from "@ui/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@ui/components/ui/collapsible";
import { Label } from "@ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import { ChevronDown, ChevronUp } from "lucide-react";

function ProductFilter() {
    const [usageIsOpen, setUsageIsOpen] = React.useState(false);
    const [filterInfoIsOpen, setFilterInfoIsOpen] = React.useState(false);

    return (
        <div>
            <Collapsible open={usageIsOpen} onOpenChange={setUsageIsOpen}>
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full p-3 justify-between"
                    >
                        <span>Usage</span>
                        {usageIsOpen ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 font-mono text-sm">
                    <RadioGroup defaultValue="default" className="mt-1">
                        <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value="default" />
                            <Label htmlFor="r1">Default</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="comfortable" />
                            <Label htmlFor="r2">Comfortable</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="compact" />
                            <Label htmlFor="r3">Compact</Label>
                        </div>
                    </RadioGroup>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible
                open={filterInfoIsOpen}
                onOpenChange={setFilterInfoIsOpen}
            >
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full p-3 justify-between"
                    >
                        <span>Filter Infomation</span>
                        {filterInfoIsOpen ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 font-mono text-sm">
                    <Button
                        className="rounded-md px-4 font-mono text-sm w-full justify-between"
                        variant="ghost"
                    >
                        Name
                    </Button>
                    <Button
                        className="rounded-md px-4 font-mono text-sm w-full justify-between"
                        variant="ghost"
                    >
                        SKU
                    </Button>
                    <Button
                        className="rounded-md px-4 font-mono text-sm w-full justify-between"
                        variant="ghost"
                    >
                        ProductStatus
                    </Button>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

export default ProductFilter;
