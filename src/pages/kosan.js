import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import KosanForm from "@/components/kosan/form"
import ListKosan from '@/components/kosan/list'
import useKosan from "@/components/kosan/customHook";

const allKosanPage = () => {

    const {
        formik,
        places,
        allKosan,
        kosanError,
        getKosan,
        handleDeleteKosan,
    } = useKosan()

    if(kosanError) return kosanError;

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kosan
                </h2>
            }>

            <Head>
                <title>Laravel - Kosan</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                        <KosanForm formik={formik} places={places}/>
                        <ListKosan allKosan={allKosan} getKosan={getKosan} handleDeleteKosan={handleDeleteKosan}/>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default allKosanPage;