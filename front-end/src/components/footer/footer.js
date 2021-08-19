import React from 'react';
import './footer.css';

export default function Footer(){
    let today = new Date();
    let yyyy = today.getFullYear();

    return <React.Fragment>
            <footer class="footer mt-auto py-3 bg-light">
                <div class="container">
                    <span class="text-muted">
                        <p>{`Nicholas Seamans ${yyyy}`}</p>
                    </span>
                </div>
            </footer>
           </React.Fragment>;
}