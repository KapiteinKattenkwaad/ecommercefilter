import Image from "next/image";

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Array<{
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }>;
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="w-[200px] min-h-[370px] mx-auto mb-4 md:mr-4 p-4 flex flex-col max-h-fit gap-4 bg-sky-100 rounded-md">
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
