import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaFilePdf, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
// Removed: useGetProductsQuery, useDeleteProductMutation
// Removed: Loader, Message (since we're simulating loading/error locally)
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- Mock Data ---
// In a real scenario, this would come from an API
const mockProducts = [
    {
        _id: '65f6c82d3f4a5b6c7d8e9f0a',
        name: 'iPhone 15 Pro',
        image: '/uploads/iphone15pro.jpg',
        brand: 'Apple',
        primaryCategory: 'Smartphones', // Changed to primaryCategory for clarity
        description: 'Latest Apple iPhone 15 Pro with A17 Bionic chip and Titanium body.',
        price: 1199,
        countInStock: 10,
        rating: 4.8,
        numReviews: 12,
    },
    {
        _id: '65f6c82d3f4a5b6c7d8e9f0b',
        name: 'Samsung Galaxy S23 Ultra',
        image: '/uploads/s23ultra.jpg',
        brand: 'Samsung',
        primaryCategory: 'Smartphones',
        description: 'Flagship Samsung Galaxy S23 Ultra with 200MP camera.',
        price: 1099,
        countInStock: 15,
        rating: 4.6,
        numReviews: 9,
    },
    {
        _id: '65f6c82d3f4a5b6c7d8e9f0c',
        name: 'Sony WH-1000XM5',
        image: '/uploads/sonywh1000xm5.jpg',
        brand: 'Sony',
        primaryCategory: 'Headphones',
        description: 'Industry leading noise-cancelling headphones.',
        price: 399,
        countInStock: 25,
        rating: 4.7,
        numReviews: 30,
    },
    {
        _id: '65f6c82d3f4a5b6c7d8e9f0d',
        name: 'MacBook Air M2',
        image: '/uploads/macbookairm2.jpg',
        brand: 'Apple',
        primaryCategory: 'Laptops',
        description: 'Apple MacBook Air with M2 chip and Liquid Retina display.',
        price: 1399,
        countInStock: 8,
        rating: 4.9,
        numReviews: 15,
    },
    {
        _id: '65f6c82d3f4a5b6c7d8e9f0e',
        name: 'PlayStation 5 Disc Edition',
        image: '/uploads/ps5.jpg',
        brand: 'Sony',
        primaryCategory: 'Gaming Consoles',
        description: 'Next-generation gaming console with ultra-high-speed SSD and ray tracing.',
        price: 499,
        countInStock: 7,
        rating: 4.7,
        numReviews: 45,
    },
    {
        _id: '65f6c82d3f4a5b6c7d8e9f0f',
        name: 'NVIDIA GeForce RTX 4080 GPU',
        image: '/uploads/rtx4080.jpg',
        brand: 'NVIDIA',
        primaryCategory: 'PC Components',
        description: 'High-performance graphics card for gaming and professional rendering.',
        price: 1399,
        countInStock: 5,
        rating: 4.9,
        numReviews: 11,
    },
];
// --- End Mock Data ---


const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    
    // --- Replaced Redux state with local component state for products ---
    const [products, setProducts] = useState(mockProducts); // Initialize with mock data
    const [isLoading, setIsLoading] = useState(false); // Simulate loading
    const [isDeleting, setIsDeleting] = useState(false); // Simulate deleting

    const navigate = useNavigate();

    // Debounce effect remains the same, it's a frontend optimization
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Simulate fetching products based on debouncedSearchTerm
    useEffect(() => {
        setIsLoading(true);
        // Simulate API call delay
        const timer = setTimeout(() => {
            const filteredProducts = mockProducts.filter(product =>
                product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                product.primaryCategory.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
            setProducts(filteredProducts);
            setIsLoading(false);
        }, 500); // Simulate network delay
        return () => clearTimeout(timer);
    }, [debouncedSearchTerm]);


    const createProductHandler = () => {
        // In a real app, this would navigate to a creation form
        // For now, we'll simulate adding a new product to local state
        const newProductId = (Math.random() * 1000000).toFixed(0);
        const newProduct = {
            _id: newProductId,
            name: `New Product ${newProductId.substring(0, 4)}`,
            image: '/uploads/sample.jpg',
            brand: 'Generic',
            primaryCategory: 'Electronics',
            description: 'A newly created product.',
            price: (Math.random() * 1000 + 50).toFixed(2),
            countInStock: Math.floor(Math.random() * 50) + 1,
            rating: 0,
            numReviews: 0,
        };
        setProducts(prevProducts => [...prevProducts, newProduct]);
        toast.success('Product added to local list (simulate success)');
        // navigate('/admin/product/create'); // Still navigates to a hypothetical create page
    };

    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product? (Frontend simulation)')) {
            setIsDeleting(true);
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 500)); 
                setProducts(prevProducts => prevProducts.filter(p => p._id !== id));
                toast.success('Product deleted successfully (frontend only)');
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                toast.error('Failed to delete product (frontend simulation)');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const generateReport = () => {
        if (!products || products.length === 0) {
            toast.info('No products available to generate a report.');
            return;
        }

        try {
            const doc = new jsPDF('landscape');
            
            doc.setFontSize(18);
            // Updated title for Technologia
            doc.text('Technologia E-commerce - Product Inventory Report', 14, 22); 
            doc.setFontSize(11);
            doc.setTextColor(100);
            const reportDate = `Generated on: ${new Date().toLocaleDateString('en-LK')}`;
            doc.text(reportDate, 14, 29);

            const tableColumn = ['ID', 'NAME', 'PRICE', 'CATEGORY', 'BRAND', 'IN STOCK'];
            
            const tableRows = products.map(p => [
                p._id,
                p.name,
                `Rs: ${p.price.toFixed(2)}`,
                p.primaryCategory, // Use primaryCategory
                p.brand,
                p.countInStock
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 35,
                headStyles: { fillColor: [37, 99, 235] },
                styles: { font: 'helvetica', fontSize: 9 },
            });

            const fileName = `Technologia_Product_Report_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            toast.success('Report download started!');

        } catch (err) {
            console.error("PDF Generation Error: ", err);
            toast.error('Failed to generate PDF report.');
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-4xl font-extrabold text-gray-800">Product Inventory</h1>
                
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search products by name, brand or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    />
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                </div>
                <div className="flex gap-3">
                    <button onClick={createProductHandler} 
                            className="bg-indigo-600 text-white py-2 px-5 rounded-full flex items-center hover:bg-indigo-700 transition-colors shadow-md">
                        <FaPlus className="mr-2" /> Add Product
                    </button>
                    <button onClick={generateReport} 
                            className="bg-green-600 text-white py-2 px-5 rounded-full flex items-center hover:bg-green-700 transition-colors shadow-md">
                        <FaFilePdf className="mr-2" /> Generate Report
                    </button>
                </div>
            </div>

            {/* Simulated Loading/Deleting States */}
            {isLoading && <p className="text-center text-indigo-600 text-lg my-4">Loading products...</p>}
            {isDeleting && <p className="text-center text-red-600 text-lg my-4">Deleting product...</p>}
            
            {/* No error message needed for pure frontend simulation unless you want a static one */}
            {/* {error ? <div className="text-red-500">Error: {error?.data?.message || error.error}</div> : ( */}

            {!isLoading && ( // Only show table if not loading
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-4 px-4 text-center text-gray-500">No products found matching your search.</td>
                                </tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-800" title={product._id}>{product._id.substring(0, 12)}...</td>
                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{product.name}</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">Rs: {product.price.toFixed(2)}</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">{product.primaryCategory}</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">{product.brand}</td>
                                        <td className="py-3 px-4 flex items-center justify-center space-x-2">
                                            <button onClick={() => navigate(`/admin/product/${product._id}/edit`)} 
                                                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors shadow-sm">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => deleteProductHandler(product._id)} 
                                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductList;