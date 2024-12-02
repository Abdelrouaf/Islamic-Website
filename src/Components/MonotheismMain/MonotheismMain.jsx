import React from 'react'
import layout from '../Style/Layout/Layout.module.scss'
import { useNavigate } from 'react-router-dom'

export default function MonotheismMain() {


    let navigate  = useNavigate()

    return (
        <div className={` ${layout.box}`}>
        
            <div className="container">
            
                <div className="inputs">
                
                    <div className="row gy-2 align-items-baseline mb-3">
                        
                        <div className="col-sm-2">
                        
                            <div className='inputTitle'>
                            
                                <h4>head title</h4>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-sm-10">
                        
                            <div className='rightInput input w-100'>
                            
                                <input required type="text" className='form-control py-2' placeholder='enter head title' id='headTitle' />
                            
                            </div>
                        
                        </div>
                
                    </div>
                
                    <div className="row gy-2 align-items-baseline mb-3">
                    
                        <div className="col-sm-2">
                        
                            <div className='inputTitle'>
                            
                                <h4>title</h4>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-sm-10">
                        
                            <div className='rightInput input w-100'>
                            
                                <input required type="text" className='form-control py-2' placeholder='enter title' id='title' />
                            
                            </div>
                        
                        </div>
                
                    </div>
                
                    <div className="row gy-2 align-items-baseline mb-3">
                    
                        <div className="col-sm-2">
                        
                            <div className='inputTitle'>
                            
                                <h4>video source</h4>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-sm-10">
                        
                            <div className='rightInput input w-100'>
                            
                                <input required type="text" className='form-control py-2' placeholder='www.youtube.com' id='videoSrc' />
                            
                            </div>
                        
                        </div>
                
                    </div>
                
                </div>
            
            </div>
        
            <div className={`d-flex justify-content-end align-items-center gap-3 ${layout.btns}`}>
                
                <button onClick={ () => { navigate(-1) } } className={`btn btn-outline-success ${layout.backBtn}`}>back</button>
            
                <button className={`btn btn-success ${layout.saveBtn}`}>save</button>
            
            </div>
        
        </div>
    )
}
