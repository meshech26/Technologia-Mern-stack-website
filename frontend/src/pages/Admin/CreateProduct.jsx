import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import { useCreateProductMutation } from '../../redux/api/adminApiSlice';
//import { useUploadProductImageMutation } from '../../redux/api/uploadApiSlice';
//import Loader from '../../components/Loader';
//import Message from '../../components/Message';
import { FaArrowLeft } from 'react-icons/fa';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const [createProduct, { isLoading: isCreating, error }] = useCreateProductMutation();
    const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validation to ensure all fields are filled and numbers are valid
        if (!name || price === '' || price < 0 || !brand || !category || countInStock === '' || countInStock < 0 || !description || !image) {
            toast.error('Please fill all fields with valid data.');
            return;
        }

        try {
            // This mutation will automatically trigger a refetch on the product list 
            // because of the tag invalidation setup in the adminApiSlice.
            await createProduct({
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            }).unwrap();
            toast.success('Product created successfully');
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="p-4">
            <Link to="/admin/productlist" className="text-blue-600 hover:underline mb-4 inline-flex items-center">
                <FaArrowLeft className="mr-2" />
                Go Back
            </Link>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Create Product</h1>
                {isCreating && <Loader />}
                {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}

                <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. MacBook Pro 16" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 2500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Image</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter image URL or upload below" />
                        <input type="file" onChange={uploadFileHandler} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        {isUploading && <Loader />}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Apple" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Laptops" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Count In Stock</label>
                        <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 10" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="e.g. High performance laptop"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors" disabled={isCreating}>
                        {isCreating ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
