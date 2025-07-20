import Image from "next/image";

interface Product {
    brand: string;
    title: string;
    thumbnail: string;
    price: number;
    [key: string]: any;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col max-h-fit gap-4 bg-blue-200 mb-4 mr-4 p-4 rounded-sm">
            <Image width={300} height={300} alt={product.title} src={product.thumbnail} />
            <p>
                {product?.brand}
            </p>
            <p>
                {product?.title}
            </p>
            <b>
                $ {product.price}
            </b>
        </div>
    );
}
