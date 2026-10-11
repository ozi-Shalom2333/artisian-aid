import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, BadgeCheck } from 'lucide-react';
import { categories } from '../data/catalog';
import { isDemo } from '../services';
import Avatar from './shared/Avatar';
import ServiceIcon from './shared/ServiceIcon';
export default function Card({ data }) {
  const category = categories.find((item) => item.name === data.category);
  const work = data.portfolio?.[0];
  const photo = work?.image_url;
  return (
    <article className="artisan-card">
      <Link
        to={`/userprofile/${data._id}`}
        className={`artisan-card-image ${!photo ? 'card-illustration' : ''}`}
        aria-label={`View ${data.fullname}'s profile`}
      >
        {photo ? (
          <img
            src={photo}
            alt={work.illustrative ? 'Illustrative workshop photograph' : work.title}
            loading="lazy"
          />
        ) : (
          <>
            <ServiceIcon name={category?.icon} size={72} />
            <span>{category?.label || data.category}</span>
          </>
        )}
        <span className="photo-caption">
          {photo
            ? work.illustrative
              ? 'Illustrative photography'
              : 'Work gallery'
            : 'Service profile'}
        </span>
      </Link>
      <div className="artisan-card-body">
        <div className="artisan-person">
          <Avatar name={data.fullname} image={data.profilePic?.image_url} />
          <div>
            <h3>
              <Link to={`/userprofile/${data._id}`}>{data.fullname}</Link>
            </h3>
            <p>{data.businessName}</p>
          </div>
          {data.verificationStatus === 'Approved' && (
            <BadgeCheck
              size={19}
              className="review-icon"
              aria-label={isDemo ? 'Profile reviewed in demo' : 'Profile reviewed'}
            />
          )}
        </div>
        <div className="artisan-card-meta">
          <span>
            <MapPin size={14} aria-hidden="true" />
            {data.location?.lga}, Lagos
          </span>
          <span className={data.availability ? 'available' : 'unavailable'}>
            {data.availability ? 'Open to requests' : 'Not taking requests'}
          </span>
        </div>
        <div className="artisan-card-footer">
          <span>{category?.label || data.category}</span>
          <Link to={`/userprofile/${data._id}`} aria-label={`View ${data.fullname}'s profile`}>
            View profile <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
