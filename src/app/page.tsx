import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold mb-4 text-gradient-yello">
                        Yello Solar Hub
                    </h1>
                    <p className="text-xl text-geist-600 mb-8">
                        Energia Solar Inteligente para o Futuro
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/kits/on-grid">
                            <Button variant="primary" size="lg">Ver Kits</Button>
                        </Link>
                        <Link href="/produtos/paineis-solares">
                            <Button variant="secondary" size="lg">Ver Produtos</Button>
                        </Link>
                    </div>
                </div>

                <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border border-geist-200 rounded-lg p-6 hover:shadow-yello transition-shadow">
                        <h3 className="text-xl font-bold mb-2 text-yello-yellow">Kits Solares</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/kits/on-grid" className="hover:text-yello-orange">Kit On-Grid</Link></li>
                            <li><Link href="/kits/off-grid-interativo" className="hover:text-yello-orange">Kit Off-Grid Interativo</Link></li>
                            <li><Link href="/kits/zero-grid" className="hover:text-yello-orange">Kit Zero-Grid</Link></li>
                            <li><Link href="/kits/hibrido" className="hover:text-yello-orange">Kit Híbrido</Link></li>
                            <li><Link href="/kits/antiapagao" className="hover:text-yello-orange">Kit Antiapagão</Link></li>
                        </ul>
                    </div>

                    <div className="border border-geist-200 rounded-lg p-6 hover:shadow-yello transition-shadow">
                        <h3 className="text-xl font-bold mb-2 text-yello-orange">Componentes</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/produtos/paineis-solares" className="hover:text-yello-orange">Painéis Solares</Link></li>
                            <li><Link href="/produtos/inversores" className="hover:text-yello-orange">Inversores</Link></li>
                            <li><Link href="/produtos/baterias" className="hover:text-yello-orange">Baterias</Link></li>
                            <li><Link href="/produtos/estruturas" className="hover:text-yello-orange">Estruturas</Link></li>
                        </ul>
                    </div>

                    <div className="border border-geist-200 rounded-lg p-6 hover:shadow-yello transition-shadow">
                        <h3 className="text-xl font-bold mb-2 text-yello-magenta">Especiais</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/produtos/carregadores-ev" className="hover:text-yello-orange">Carregadores EV</Link></li>
                            <li><Link href="/produtos/medidor-grid-zero" className="hover:text-yello-orange">Medidor Grid Zero</Link></li>
                            <li><Link href="/produtos/bomba-de-agua" className="hover:text-yello-orange">Bomba de Água</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </main>
    );
}
