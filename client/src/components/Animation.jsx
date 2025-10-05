import React from 'react'

function Animation() {
    return (
        <div className='hidden lg:flex items-center justify-center'>
            <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rectangle, index) => (
                    <div
                        key={index}
                        className="bg-primary size-24 animate-pulse rounded-md"
                        style={{ animationDuration: `${rectangle}s` }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Animation
