import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useRef} from 'react'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:8000/api'

const MessageStudent = (props) => {

    const [msgData, setMsgData] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        try {

            axios.get(baseUrl + '/get-message/' + props.teacher_id + '/' + props.student_id)
                .then((res) => {
                    setMsgData(res.data)
                });
        } catch (error) {
            console.log(error)
        }
    }, []);

    // useEffect(() => {
    //     let teacher_id = props.teacher_id
    //     ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${teacher_id}`);

    //     ws.current.addEventListener('message', (event) => {
    //         const message = JSON.parse(event.data);
    //         setMsgData((prevMsgs) => [...prevMsgs, message]);
    //     });

    //     return () => {
    //         if (ws.current) {
    //             ws.current.close();
    //         }
    //     };
    // }, [props.teacher_id]);

    const fetchMsgs = () => {
        try {
            axios.get(baseUrl + '/get-message/' + props.teacher_id + '/' + props.student_id)
                .then((res) => {
                    setMsgData(res.data)
                    const objDiv = document.getElementById("msgList");
                    objDiv.scrollTop = objDiv.scrollHeight
                });
        } catch (error) {
            console.log(error)
        }
    }

    
    const msgList = {
        height: '500px',
        overflow: 'auto'

    }

    return (
        <>
            <p><span className='btn btn-sm btn-secondary' onClick={fetchMsgs} title='Refresh'><i className='bi bi-bootstrap-reboot '></i></span></p>
            <div style={msgList} className="rounded" id="msgList">
                {msgData.map((row, index) =>
                    <div className='row mb-4'>
                        {row.msg_from != 'student' &&
                            <div className='col-5'>
                                <div className=' rounded alert alert-dark mb-1 ms-3'>
                                    {row.msg_to}
                                </div>
                                <small className='text-muted ms-3'>{row.msg_time}</small>
                            </div>
                        }
                        {row.msg_from == 'student' &&
                            <div className='col-5 offset-7'>
                                <div className=' rounded alert alert-info mb-1 me-4'>
                                    {row.msg_to}
                                </div>
                                <small className='text-muted me-4'>{row.msg_time}</small>
                            </div>
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default MessageStudent
