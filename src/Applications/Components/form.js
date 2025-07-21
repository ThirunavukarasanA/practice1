import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { HiOutlineDocumentDownload, HiOutlineClipboardList } from "react-icons/hi";
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Broucher(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
    })
    // const [broucher, setBroucher] = useState(false)
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [errors, setErrors] = useState({});
    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [open, setOpen] = useState(props.state);
    const [isSaveClick, setIsSaveClick] = useState();




    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            Broucher(true);
        }
    }, [errors]);

    const validation = () => {
        let errors = {};
        let regex = /^[A-Za-z\s]+$/;
        let number = /^[0-9]/;
        let email = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
        if (values.name == "") {
            errors.name = "Name is Required";
        } else if (!regex.test(values.name)) {
            errors.name = "Name must be alphabets only";
        }
        if (values.email == "") {
            errors.email = "Email is Required";
        } else if (!email.test(values.email)) {
            errors.email = "Email is invalid";
        }

        if (values.phone == "") {
            errors.phone = "Mobile Number is Required";
        } else if (!number.test(values.phone)) {
            errors.phone = "Mobile Number should be numeric only";
        }

        return errors;
    };


    const handlesubmit = (e) => {
        let temp_state = isSaveClick;
        temp_state = true;
        setIsSaveClick(temp_state);
        var errorVal;
        errorVal = validation(values);
        setErrors(errorVal);
        // setBroucher(false)
        if (Object.keys(errorVal).length === 0) {
            // setBroucher(false)
            let myjson = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            }
            axios.post(`http://localhost:5050/imsr/broucher`, myjson)
                .then(res => {
                    setValues({
                        name: "",
                        email: "",
                        phone: ""
                    })
                    console.log("sddsw", res);
                    alert("Submitted Sucessfully")
                    setOpen(false)

                    const element = document.createElement('a');
                    element.setAttribute('download', 'IMSR BROCHURE');
                    element.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABXFBMVEUAAAD////S0tIQAAAAAB/i///r28J8pM03Nze94+z20rBJgKPJsoVTU1OWlpb///pBAABlZWWjo6MXAAD///Xv///3//83AADt9v///+23p5yDclfEvrvBwsGHeWJCREbs497SyLdwZ2C/rZxPPhbcz8VmTjfVybJPNSS+q4/66dxbSyOyjmzJu5zaxqzOvJdvQwz76tPEpn8oNUNDP1xWSUehsMPCydRdNQ8+Sk1ng6dRRTkXKTWkwteCZ05COisAABZYcoPX7f8AACnr17Y5SWdvSB5xmrpJcJaeeUzM3vPnxaUAL1UAIURbIgAADD4VS3AtXIBhMACOttQmAAD/9di+2fUAEE+BXjSCWR8AQG/Pr4pFHwBBEgCRbElMb5O1kmYAHlOpx+ojWYZzTiwAGEOt0OEAMWsAEzJlZ3nu7fSjfUd2RRtPDQB5f4dUKQBJYXmefWh0XTgkDwCH1EfHAAAEz0lEQVR4nO2b+XsURRBAp02MisqorMcihADisR6w4IGIGo14EYyoEUHBeOARNV7///e5s3GP6Zqqmc72zoT53vstm0r3vJ2e6uruSZIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCD3uMocfmTAkxXbva9SkwfG8fdbYQ/UZDgiPXJ0+dhCmw2HrBw/YUre+YYZJ59qu6Fzp55uu6FzzzzbdkOXPtd2Q+d6z7fd0LkXWm/oXmy9oXup9YZCsX2G7nTrDb1000ZDd6b1hv1DbTd0Z/el4bkHB7x8t9760itZxKtHXyu/3u75SbuvZ391QY/tD5t9Yxx/Mfvx2Jt+WPpW9vnbsxgOWbUMR0EL75RK+lPG6rtqaOd8IlkT8e/N7LbLomU4tdC9pF/xLu97DX+gh55NJB+KqI9qNkzWPrYNL3sNrz+ht1twHWKQdg8VRM3VMLli38X0E6/l7/XYM4nPxqN+zNeRBAMMk09NQzH2ruqh8uplPv2sAcPkc9Ow/4XXtD6sN8VO1pd+SKw8E2Z47TFT8SuvaWOeu+6F3hARsfJMmKFMBzn8sbconi01VCTezjfNGMqUPk3fz376qO7dzAWuibwbLc8EGl7R74rL1zVDbuij+lYuUCYlf3aty3DVnhNv+Y3/pIbml5Ri9PfjCYYZlmRTUat8q4Z2p4fpL2Km3WrM0KinXcGOjSw2x0znSpF0O483ZqjflGG8aF0vTg9MRYnqx68AazS8as6I8un5Tk1NU7fpmvjlj80ZGtlxwKZf1VjF6dY4RtxoMe3UaGgsGAZ05ePzgxo8KcvmmmdCDTdsw4dk+2qu6YwWGKKg70Qrumsx1HPNaAtSzEBR80yo4e1gQ70MWtp92jbEXfYr+FoNg59Do0hIdzOmqHVj1jOxDQty6eAxU9PvbgkkKraiXZz6DEPnwwyxuM2F3xaj2N8NqdcwtKbJ0Jdc2QJCVGyR80yoob1NfrqoA6OHbBEo7rBYoNRrqC+HMraKu1C/ls2F5Gf/s/7N4kZqMpTLnBzK17+uPrzXZaaNuLjfi6Feg2WINf4IdXvnsih5UrmVWquhvQBe0gpmdee096t/e4uTVW2G1imOMyayRW1wp9v+J781a2ge9LlU3z2ytwam6BbVDPUZ2mW36+uvZJb85YT4eSbI0N4PNqst+wGe8HujhiVXmf5h9CKmPaXDOQjGOyG1B5hanOYoeEkuAlVOuc/tlByPDnLEn2Yv9nlAtTbC+evggB1jo753cMi2s8+chpTkCGPndEJxXTsDMd826ZWdFRnH+mP8M7d9ZVh63LduHuoMib24j2pY4cS2ZK5xsTcR4xp2Kix5jGP9/xuxppuGDdNKu2NluSb64j6iYbVprKw4jbyJGNOw4uaYfGUmh3iVY/8YVi5EAo9X94th+nfl/vSdUxf9sCKeYe+fgA6t4jTeG0JxDcW5tomVa+awuI9gGHQDE7M43ZyH4KyGK8sRe5xHnpnR8Phy2T/LFiBP7EfMI8/MYnjq8L9761I71p9LntmT4cr29smd8NE5RttSjvcmYo4Ld1XnyImHM2buszjXdOO9idg4F+8tpOnLAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB28R+Zm4SkaajWmAAAAABJRU5ErkJggg==');

                    element.style.display = 'none';

                    document.body.appendChild(element);

                    element.click();
                    document.body.removeChild(element);

                })

                .catch(err => {
                    console.log("ghk", err);
                    setValues({
                        name: "",
                        email: "",
                        phone: ""
                    })
                    setOpen(false)
                    alert("Error in Submitting Please Try Again later")
                })
        }

    }
    return (
        <div>
            <button onClick={() => setOpen(true)} className="text-white sm:mb-4 sm:flex sm:w-[100%] center flex hover:bg-white sm:text-[14px] hover:text-black Transition mr-4  px-6 py-3 tracking-wider headerButton">
                <HiOutlineDocumentDownload className="text-[20px] mx-2" />  {props.broucherbtn}</button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="mt-8 p-8 rounded-lg gradient w-[500px] h-[450px]">
                    {/* <h3 className="relative right-[22px] text-center py-2 font-medium  border-top text-h3 bg-secondary text-white w-[480px]">{props.brouchertitle}</h3> */}
                    <h3 className="relative right-[22px] text-center py-2 font-medium bg-secondary border-top text-h3 curve text-white w-[480px]">{props.brouchertitle}</h3>
                    <div className="mt-3">
                        <label className="font-base text-font-color"> Name </label>
                        <div>
                            <input type="text" value={values.name} id='name' className="border h-[36px] w-[100%] borders my-1 p-3 border-radius"
                                onChange={(e) => {
                                    setname(e.target.value)
                                    values.name = e.target.value;
                                    if (isSaveClick == true) {
                                        setErrors(validation(values));
                                    }
                                }}
                            />
                            <span className='text-red'>{errors.name}</span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <label className="font-base text-font-color "> Email </label>
                        <div>
                            <input type="email" value={values.email} id='email' className="h-[36px] w-[100%] borders my-1 p-3 border-radius"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    values.email = e.target.value;
                                    if (isSaveClick == true) {
                                        setErrors(validation(values));
                                    }
                                }}

                            />
                            <span className='text-red'>{errors.email}</span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <label className="font-base text-font-color "> Mobile Number </label>
                        <div>
                            <input type="text" value={values.phone} id='phone' className="h-[36px] w-[100%] borders my-1 p-3 border-radius"
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                    values.phone = e.target.value;
                                    if (isSaveClick == true) {
                                        setErrors(validation(values));
                                    }
                                }}
                                maxLength={10}
                                minLength={10}
                                onKeyPress={(e) => { if (!/^[0-9]/.test(e.key)) { e.preventDefault() } }}
                            />
                            <span className='text-red'>{errors.phone}</span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-2">
                        <button onClick={(e) => handlesubmit(e)} type='submit' className="mt-2 mb-0 cursor-pointer bg-secondary hover:bg-white hover:text-secondary border-2 transition duration-150  border-radius font-medium  w-[40%] text-white  text-center px-1 py-2">
                            {/* {
                        broucher==true?  <a href='data:image/png;base64,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' download> 
                    Submit</a> :<>Submit</>
                      } */}
                            submit
                        </button>
                        <a id="autodownload" href='data:image/png;base64,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' download></a>
                    </div>

                </div>
            </Modal>
        </div>
    )
}
