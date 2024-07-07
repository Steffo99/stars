import {React} from "https://deno.land/x/lume@v2.2.1/deps/react.ts"
import {ratingToClassName} from "../_utils/rating.ts"


export type ReviewInfoProps = {
    name?: string,
    rating?: number,
    metadata?: React.ReactNode,
    children?: React.ReactNode,
}

export function ReviewInfo({name, rating, metadata, children}: ReviewInfoProps) {
    const reviewBarStyle = {}
    if(rating) {
        reviewBarStyle["width"] = `${rating}%`
    }

    const ratingClass = ratingToClassName(rating);

    return (
        <div className={`reviewinfo ${ratingClass}`}>
            <h2 className={"reviewinfo-name"}>
                <data value={name}>
                    {name}
                </data>
            </h2>
            <div className={"reviewinfo-rating"}>
                <data value={rating}>
                    {rating !== 0 && rating}
                </data>
            </div>
            <div className={"reviewinfo-bar-base"} aria-hidden={true}/>
            <div className={"reviewinfo-bar-empty"} aria-hidden={true}>
                <div
                    className={"reviewinfo-bar-fill"}
                    style={reviewBarStyle}
                    aria-hidden={true}
                />
            </div>
            <div className={"reviewinfo-metadata"}>
                {metadata}
            </div>
            <div className={"reviewinfo-content"}>
                {children}
            </div>
        </div>
    )
}

export type ReviewInfoMetadataRowProps = {
    label?: React.ReactNode,
    icon?: React.ReactNode,
    className?: string,
    children?: React.ReactNode
}

ReviewInfo.MetadataRow = function ReviewInfoMetadataRow({label, icon, className, children}: ReviewInfoMetadataRowProps) {
    return <>
        <div className={`reviewinfo-metadata-label ${className ?? ""}`}>
            <div>
                {label}
            </div>
        </div>
        <div className={`reviewinfo-metadata-content ${className ?? ""}`}>
            {icon &&
                <div className={`reviewinfo-metadata-icon`}>
                    {icon}
                </div>
            }
            <div>
                {children}
            </div>
        </div>
    </>
}
