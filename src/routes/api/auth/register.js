import { Router } from 'express';
import authController from '../../../controllers/authController.js';
import { validarRegistro } from '../../../middlewares/validacionDeDatos.js';

const router = Router();
router.post('/', validarRegistro, authController.register);
export default router;

/*import {Router} from 'express';
import express from 'express';
import UserMiddleware from './../middlewares/authMiddleware.js';

const router = Router();
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));
const svc = new ProvinceService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if(returnArray != null){
        respuesta = res.status(200).json(returnArray);
    } else{
        respuesta = res.status(500).send(`Error Interno.`);
    }
    return respuesta;
});

router.get('/:id', async (req, res) => {
    let respuesta;
    const id = req.params.id;
    const returnArray = await svc.getByIdAsync(id);
    if(returnArray != null){
        respuesta = res.status(200).json(returnArray);
    } else{
        respuesta = res.status(404).send(`No se encontró una provincia con ese id.`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    const provinceData = req.body;
    
    if (!provinceData || Object.keys(provinceData).length === 0) {
        return res.status(400).send("Error: El Body llegó vacío al controlador.");
    }

    if (!provinceData.name || provinceData.name.length < 3) {
        return res.status(400).send("El nombre es obligatorio y debe tener al menos 3 letras.");
    }

    try {
        await svc.createAsync(provinceData);
        return res.status(201).send("Creado correctamente.");
    } catch (error) {
        console.error(error);
        return res.status(400).send("Error, no se pudo crear la provincia.");
    }
});

router.put('', async (req, res) => {
    const provinceData = req.body;

    if (!provinceData || Object.keys(provinceData).length === 0) {
        return res.status(400).send("Error: El Body de la actualización llegó vacío.");
    }

    if (!provinceData.name || provinceData.name.length < 3) {
        return res.status(400).send("El nombre es obligatorio y debe tener al menos 3 letras.");
    }
    
    try {
        const rowsAffected = await svc.updateAsync(provinceData);
        if (rowsAffected > 0) {
            return res.status(201).send("Actualizado correctamente.");
        } else {
            return res.status(404).send("No existe una provincia con ese id.");
        }
    } catch (error) {   
        console.error(error);
        return res.status(400).send("Error, no se pudo actualizar la provincia.");
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const rowsAffected = await svc.deleteByIdAsync(id);
    if(rowsAffected > 0){
        return res.status(200).send("Eliminado correctamente.");
    } else{
        return res.status(404).send(`No se encontró una provincia con ese id.`);
    }
});

export default router; */