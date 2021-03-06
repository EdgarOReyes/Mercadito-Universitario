import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row, Col, Card, Button, Modal, Form} from 'react-bootstrap';
import {obtenerMisOrdenesCliente} from '../acciones/accionesOrdenes';
import {obtenerVendedor, obtenerCliente} from '../acciones/accionesUsuario';
import Loader from '../componentes/Loader';
import Mensaje from '../componentes/Mensaje';

const PantallaMisPedidos = () => {
    const dispatch = useDispatch();

    const usuarioLogin = useSelector((state) => state.usuarioLogin);
    const { infoUsuario } = usuarioLogin;

    const misOrdenesCliente = useSelector((state) => state.misOrdenesCliente);
    const { loading, error, ordenes } = misOrdenesCliente;

    const [ordenActiva, setOrdenActiva] = useState({});
    const [show, setShow] = useState(false);

    const [chat, setChat] = useState([]);

    const [mensaje, setMensaje] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() =>{
        if(!ordenes){
            dispatch(obtenerMisOrdenesCliente(infoUsuario._id));
        }else{
            
        }
    }, [dispatch, ordenes])

    const cardHandler = () =>{
        console.log("orden")
    }

    const handleSend = (e) =>{
        e.preventDefault();
        var d = new Date();
        var n = d.getHours().toString() + ':' + d.getMinutes().toString();
        const nuevoMsj = {
            hora:n,
            texto:mensaje
        }
         
        if (mensaje.replace(/\s/g, '').length) setChat([...chat, nuevoMsj]);



        setMensaje('');
    }

    const handleChat = (o) =>{
        setOrdenActiva(o);
        handleShow();
    }

    return (
        <Container className="pt-5">
            <h1>Mis pedidos</h1>
            {error && <Mensaje>{error}</Mensaje>}
            {loading ? <Loader /> : (
                <>
                    {ordenes != undefined && (
                        <>
                            {ordenes.map((o, index) => (
                                <div key={index} className="mt-4">
                                    <Card onClick={() => cardHandler(o)} border={o.estatus === 'pendiente' ? 'warning' : o.estatus === 'finalizada' ? 'success' : 'danger'} className="product-card"  style={{ height:'9rem' }}>
                                        <div style={{height:'12px' ,width:'100%', backgroundColor: o.estatus === 'pendiente' ? '#F0AD4E' : o.estatus === 'finalizada' ? '#2BB875' : '#D9534F'}}>&nbsp;</div>
                                            <Row>
                                                <Col className="px-5 py-4" md={12}>
                                                            <p className="float-right" style={{fontFamily:'Roboto', fontSize:'14px'}}>Orden: {o._id}</p>
                                                            <p style={{fontFamily:'Roboto', fontSize:'14px'}}>Estatus: {o.estatus}</p>
                                                            <Button onClick={() => handleChat(o)} variant="outline-primary" className="float-right"><i className="far fa-comments"></i>  Chat con vendedor</Button>
                                                            <h6>{o.productos[0].nombre}</h6>
                                                            <p style={{fontFamily:'Roboto', fontSize:'14px'}}>Vendedor: {o.nombreVendedor}</p>
                                                            
                                                </Col>
                                            </Row>
                                    </Card>   
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{backgroundColor:'#226BE8', color:"#FFF"}} closeButton>
                    <Modal.Title>Chat - {ordenActiva.nombreVendedor}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{overflow:'auto', height:"30rem"}}>
                    {chat.map((m, index) => (
                        <div className='my-2 p-2 float-right ml-5' key={index} style={{fontSize:'14px',borderRadius:'20px', backgroundColor:"#006AFF", color:"#FFF", overflow:'auto', width:'12rem'}}>
                            {m.hora } {m.texto}
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Form onSubmit={handleSend}>
                        <Row>
                            <Col style={{width:'24rem'}} md={10}>
                                <Form.Control type="text" placeholder="Aa" value={mensaje} onChange={(e) => setMensaje(e.target.value)}/>        
                            </Col>
                            <Col md={2}>
                                <Button type="submit" size="m" variant="outline-primary" >
                                <i className="far fa-paper-plane"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default PantallaMisPedidos;
