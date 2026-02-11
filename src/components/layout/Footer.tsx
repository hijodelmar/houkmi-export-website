import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer({ lang, dict }: { lang: string; dict: any }) {
    return (
        <footer className="bg-gradient-to-br from-brand-green/10 via-white to-brand-orange/10 pt-12 pb-8 border-t-2 border-brand-green/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                    <Logo className="h-10 w-auto" />
                    <p className="text-gray-700 text-sm">
                        {dict.Footer.description}
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-brand-orange transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-brand-orange transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-brand-orange transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900">{dict.Footer.quick_links}</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href={`/${lang}/about`} className="text-gray-700 hover:text-brand-orange transition-colors font-medium">
                                {dict.Navigation.about}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/products`} className="text-gray-700 hover:text-brand-orange transition-colors font-medium">
                                {dict.Navigation.products}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/gallery`} className="text-gray-700 hover:text-brand-orange transition-colors font-medium">
                                {dict.Navigation.gallery}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/contact`} className="text-gray-700 hover:text-brand-orange transition-colors font-medium">
                                {dict.Navigation.contact}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900">{dict.Footer.contact_us}</h4>
                    <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-brand-green flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{dict.Contact.location || "Agadir, Morocco"}</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                            <span className="text-gray-700 text-sm">+34 691 78 11 8</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-brand-purple flex-shrink-0" />
                            <span className="text-gray-700 text-sm">info@houkmiexport.com</span>
                        </li>
                    </ul>
                </div>


            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-green/20 text-center text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} HOUKMI EXPORT. {dict.Footer.rights}
            </div>
        </footer>
    );
}
