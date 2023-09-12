import React, { useEffect, useRef, useState } from 'react'
// import './modal.css'
import './card.css'

export default function PopupModal() {
    const [modal, setModal] = useState(false)
    const reference = useRef()
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!reference.current.contains(event.target)) {
                setModal(false);
            }
        })
    })

    return (
        <>

            <button onClick={() => setModal(true)} className="text-black sm:mb-4 sm:flex sm:w-[100%] center flex hover:bg-black sm:text-[14px] hover:text-white Transition mr-4  px-6 py-3 tracking-wider headerButton" >PopupModal</button>

            {modal == true ?

                <div className="justify-center bg-[#0000004d] items-center scale-up-hor-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                    <div className=' bg-white w-[500px] h-[450px]' ref={reference}>
                        <header className='text-black bg-[#470657] h-[70px]'>
                            <h2 className='text-h2 relative top-3 left-[45%] text-white'>Popup</h2>
                            <span onClick={()=>setModal(false)} className="relative top-[-25px] left-[92%] text-white cursor-pointer text-h1">&times;</span>
                        </header>
                        <main>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2 px-3">
                                    Name
                                </label>
                                <input className="h-[40px] w-[90%] style p-3" type="text" placeholder="Name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mobile
                                </label>
                                <input className="rounded-md border w-full py-2 px-3" type="number" placeholder="Mobile" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input className="rounded-md border w-full py-2 px-3" type="text" placeholder="Email" />
                            </div>
                        </main>
                        <footer>
                            <button>submit</button>
                        </footer>
                    </div>

                </div> : <></>}

        </>

    )
}
