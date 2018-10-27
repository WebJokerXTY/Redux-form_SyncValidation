import React from 'react';
import { Field, reduxForm } from 'redux-form';

//验证函数命名validate、warn以及返回对象名errors、warnings固定不可变
const validate = values => {
    const errors = {};
    if(!values.username) {
        errors.username = 'Required'
    } else if(values.username.length > 15) {
        errors.username = 'Must be 15 charactors or less'
    }
    if(!values.email) {
        errors.email = 'Required'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if(values.age < 19) {
      warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

//meta: { touched, error, warning } 参数属性命名固定写法，不可更改
//age的errors对应Field中属性meta.error，age的warnings对应Field中属性meta.warning
//meta.touched获得焦点时为false表示正在输入，反之为true
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder = {label} type = {type} />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const SyncValidationForm = (props) => {
    const { handleSubmit, pristine, reset, submitting} = props;
    return(
        <form onSubmit = {handleSubmit}>
            <Field 
                name = "username" 
                type = "text" 
                component = {renderField} 
                label = "Username" 
            />
            <Field 
                name = "email" 
                type = "email" 
                component = {renderField} 
                label = "Email" 
            />
            <Field 
                name = "age" 
                type = "number" 
                component = {renderField} 
                label = "Age"
            />
            <div>
                <button type = "submit" disabled = {pristine || submitting}>
                    Submit
                </button>
                <button type = "button" disabled = {pristine || submitting} onClick = {reset}>
                    Reset
                </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'syncValidation', 
    validate,               //向表单添加验证方法
    warn                    //向表单添加警告方法
})(SyncValidationForm)