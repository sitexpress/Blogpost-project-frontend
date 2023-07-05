import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";

export const Registration = () => {

    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            fullName: 'John Doe',
            email: 'JohnDoe@test.ru',
            password: '54321'
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))
        console.log(data)

        if (!data.payload) {
            return alert('Не удалось зарегестрироваться!')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }

    }

    if (isAuth) return <Navigate to="/"/>
    return (
        <Paper classes={{root: styles.root}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography classes={{root: styles.title}} variant="h5">
                    Создание аккаунта
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{width: 100, height: 100}}/>
                </div>
                <TextField
                    className={styles.field}
                    type="fullName"
                    label="Полное имя"
                    fullWidth
                    {...register('fullName', {required: 'Укажите полное имя'})}
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                />
                <TextField
                    className={styles.field}
                    type="email"
                    label="E-Mail"
                    fullWidth
                    {...register('email', {required: 'Укажите почту'})}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                />
                <TextField
                    className={styles.field}
                    type="password"
                    label="Пароль"
                    fullWidth
                    {...register('password', {required: 'Укажите пароль'})}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                />
                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
