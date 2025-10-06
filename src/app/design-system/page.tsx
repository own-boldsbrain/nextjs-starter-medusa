/**
 * Yello Solar Hub - Design System Demo Page
 * 
 * Showcase of Vercel Geist + Yello Solar brand components
 * 
 * Route: /design-system
 */

import { Button } from '@/lib/design-system/components/Button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/lib/design-system/components/Card';
import { YelloLogo } from '@/lib/design-system/components/YelloLogo';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-geist-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <YelloLogo size={80} className="animate-pulse" />
            <h1 className="text-6xl font-black bg-gradient-to-b from-[#FFCE00] via-[#FF6600] to-[#FF0066] bg-clip-text text-transparent">
              Yello Solar Hub
            </h1>
          </div>
          <p className="text-xl text-geist-600 font-medium">
            Design System - Vercel Geist + Brand Gradient
          </p>
        </div>

        {/* Logo Showcase */}
        <Card className="mb-8 bg-gradient-to-br from-geist-50 to-white">
          <CardHeader>
            <CardTitle>Brand Logo</CardTitle>
            <CardDescription>
              Geometric icon with gradient (#FFCE00 → #FF6600 → #FF0066)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around gap-8 py-4">
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md inline-block mb-3">
                  <YelloLogo size={60} />
                </div>
                <p className="text-sm text-geist-600">Small (60px)</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-8 rounded-lg shadow-lg inline-block mb-3">
                  <YelloLogo size={100} />
                </div>
                <p className="text-sm text-geist-600">Medium (100px)</p>
              </div>
              <div className="text-center">
                <div className="bg-geist-900 p-10 rounded-lg shadow-xl inline-block mb-3">
                  <YelloLogo size={121} />
                </div>
                <p className="text-sm text-geist-600">Large (121px) on dark</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
            <CardDescription>
              Gradient: #FFCE00 (Yellow) → #FF6600 (Orange) → #FF0066 (Magenta)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-full h-24 bg-gradient-to-br from-[#FFCE00] to-yello-yellow rounded-lg shadow-md mb-2 flex items-center justify-center">
                  <YelloLogo size={40} />
                </div>
                <p className="font-mono text-sm font-semibold">#FFCE00</p>
                <p className="text-xs text-geist-500">Yellow (Stop 0%)</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-gradient-to-br from-[#FF6600] to-yello-orange rounded-lg shadow-md mb-2 flex items-center justify-center">
                  <YelloLogo size={40} />
                </div>
                <p className="font-mono text-sm font-semibold">#FF6600</p>
                <p className="text-xs text-geist-500">Orange (Stop 50%)</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-gradient-to-br from-[#FF0066] to-yello-magenta rounded-lg shadow-md mb-2 flex items-center justify-center">
                  <YelloLogo size={40} />
                </div>
                <p className="font-mono text-sm font-semibold">#FF0066</p>
                <p className="text-xs text-geist-500">Magenta (Stop 100%)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>
              Primary (Yellow), Secondary (Orange), Tertiary (Magenta), Ghost, Outline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="primary">Primary CTA</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="tertiary">Tertiary Action</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="xl">Extra Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" loading>Loading...</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" fullWidth>Full Width</Button>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card elevation="flat">
            <CardHeader>
              <CardTitle className="text-lg">Flat Card</CardTitle>
              <CardDescription>No shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-geist-600">
                Used for minimal emphasis
              </p>
            </CardContent>
          </Card>

          <Card elevation="raised">
            <CardHeader>
              <CardTitle className="text-lg">Raised Card</CardTitle>
              <CardDescription>Default elevation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-geist-600">
                Standard card style
              </p>
            </CardContent>
          </Card>

          <Card elevation="floating">
            <CardHeader>
              <CardTitle className="text-lg">Floating Card</CardTitle>
              <CardDescription>High elevation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-geist-600">
                Used for modals, popovers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Colored Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="yellow" interactive>
            <CardHeader>
              <CardTitle className="text-lg">Yellow Variant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-geist-700">
                Brand yellow background with hover effect
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card variant="orange" interactive>
            <CardHeader>
              <CardTitle className="text-lg">Orange Variant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-geist-700">
                Brand orange background with hover effect
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card variant="magenta" interactive>
            <CardHeader>
              <CardTitle className="text-lg">Magenta Variant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-geist-700">
                Brand magenta background with hover effect
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="tertiary" size="sm">Action</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Geist Sans font system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-geist-500 mb-1">Display 1</p>
                <h1 className="text-6xl font-black">The quick brown fox</h1>
              </div>
              <div>
                <p className="text-xs text-geist-500 mb-1">Heading 1</p>
                <h1 className="text-4xl font-semibold">The quick brown fox</h1>
              </div>
              <div>
                <p className="text-xs text-geist-500 mb-1">Heading 2</p>
                <h2 className="text-3xl font-semibold">The quick brown fox</h2>
              </div>
              <div>
                <p className="text-xs text-geist-500 mb-1">Body Large</p>
                <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div>
                <p className="text-xs text-geist-500 mb-1">Body</p>
                <p className="text-base">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div>
                <p className="text-xs text-geist-500 mb-1">Body Small</p>
                <p className="text-sm">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div>
                <p className="text-xs text-geist-500 mb-1">Caption</p>
                <p className="text-xs">The quick brown fox jumps over the lazy dog</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
