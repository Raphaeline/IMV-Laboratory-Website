import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

const ModalAlert = ({ header, body, method, danger }) => {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-25'>
            <div className='flex flex-col w-80 px-8 py-8 rounded-xl bg-white'>
                <h1
                    className={`mb-4 text-2xl font-bold text-blue-500 ${
                        danger && 'text-red-500'
                    }`}>
                    {header}
                </h1>
                <p className='mb-8'>{body}</p>
                <button
                    onClick={method}
                    className={`ml-auto -mr-4 -mb-4 px-6 h-10 rounded-lg text-white uppercase text-sm font-semibold bg-blue-500 ${
                        danger && 'bg-red-500'
                    } focus:outline-none`}>
                    OK
                </button>
            </div>
        </div>
    );
};

const FormWebinar = () => {
    const router = useRouter();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [organization, setOrganization] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [modalDanger, setModalDanger] = useState(false);
    const [method, setMethod] = useState(() => () => setShowModal(false));

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        showModal
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'auto');
    }, [showModal]);

    const redirectAfterRegistered = () => {
        setShowModal(false);
        router.push({
            pathname: '/webinar/register-success',
            query: {
                fullname,
                success: true,
            },
        });
    };

    const handleRegisterWebinar = async () => {
        const participantData = {
            fullname,
            email,
            phone,
            status,
            organization,
            attendance: false,
        };

        if (fullname && email && phone && status && organization) {
            try {
                setLoading(true);

                const { data: allData, error: errorAllData } = await supabase
                    .from('webinar_participants')
                    .select('fullname, email')
                    .match({ email: email });

                if (errorAllData) console.log(errorAllData);
                if ((await allData.length) !== 0) {
                    await setFullname(allData.fullname);
                    await setModalHeader(`Halo, ${fullname} 👋🏻`);
                    await setModalBody(
                        'Kamu sudah terdafatar pada webinar IMV Laboratory kok. Klik OK untuk bergabung ke grup Whatsapp webinar ya...'
                    );
                    await setModalDanger(false);
                    await setShowModal(true);
                    await setMethod(() => redirectAfterRegistered);
                } else {
                    const { data, error } = await supabase
                        .from('webinar_participants')
                        .insert([participantData]);
                    if (error) alert(error.message);
                    if (data) {
                        await setModalHeader(`Selamat, ${fullname}! 🎉`);
                        await setModalBody(
                            'Kamu berhasil mendaftarkan diri pada acara webinar IMV Laboratory. Klik OK untuk bergabung ke grup Whatsapp webinar ya...'
                        );
                        await setModalDanger(false);
                        await setShowModal(true);
                        await setMethod(() => redirectAfterRegistered);
                    }
                }
            } finally {
                setLoading(false);
            }
        } else {
            setModalHeader('Gagal! 😓');
            setModalBody('Semua data wajib diisi.');
            setModalDanger(true);
            setShowModal(true);
            setMethod(() => () => setShowModal(false));
        }
    };

    const inputClass =
        'mt-2 mb-4 px-4 w-full h-12 rounded-md text-gray-900 bg-gray-100 focus:outline-none';
    const labelClass = 'ml-1';
    return (
        <div
            id='register'
            className={`w-full p-8 rounded-xl bg-white shadow-lg ${
                loading && 'animate-pulse'
            }`}>
            <h2 className='mt-2 mb-8 text-2xl font-bold text-center'>
                Yuk, ikutan webinarnya 👇🏻
            </h2>
            <label htmlFor='fullname' className={labelClass}>
                Nama Lengkap
            </label>
            <input
                id='fullname'
                onChange={e => setFullname(e.target.value)}
                type='text'
                className={inputClass}
                required
            />
            <label htmlFor='email' className={labelClass}>
                Alamat email
            </label>
            <input
                id='email'
                onChange={e => setEmail(e.target.value)}
                type='email'
                className={inputClass}
                required
            />
            <label htmlFor='phone' className={labelClass}>
                Nomor HP
            </label>
            <input
                id='phone'
                onChange={e => setPhone(e.target.value)}
                type='phone'
                className={inputClass}
                required
            />
            <label htmlFor='status' className={labelClass}>
                Status
            </label>
            <div className='relative'>
                <select
                    required
                    id='status'
                    onChange={e => setStatus(e.target.value)}
                    className={`${inputClass} appearance-none cursor-pointer`}>
                    <option value=''>Pilih status / profesi</option>
                    <option value='Mahasiswa'>Mahasiswa</option>
                    <option value='Dosen'>Dosen</option>
                    <option value='Umum'>Umum</option>
                </select>
                <ChevronDownIcon className='absolute top-5 right-4 w-6 h-6 pointer-events-none' />
            </div>
            <label htmlFor='organization' className={labelClass}>
                Asal Perguruan Tinggi / Perusahaan
            </label>
            <input
                id='organization'
                onChange={e => setOrganization(e.target.value)}
                type='text'
                className={inputClass}
                required
            />
            <button
                onClick={handleRegisterWebinar}
                className='flex justify-center items-center gap-2 w-full mt-2 px-4 h-12 rounded-lg text-white bg-blue-500 hover:bg-blue-700 focus:outline-none'>
                <p className='uppercase text-center text-sm font-medium tracking-wide'>
                    DAFTARKAN SAYA
                </p>
            </button>
            {showModal && (
                <ModalAlert
                    header={modalHeader}
                    body={modalBody}
                    method={method}
                    danger={modalDanger}
                />
            )}
        </div>
    );
};

export default FormWebinar;
