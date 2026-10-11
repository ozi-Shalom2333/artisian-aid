export default function Avatar({ name = 'Artisan', image, large = false }) {
  return (
    <span className={`initial-avatar ${large ? 'avatar-large' : ''}`} aria-hidden="true">
      {name
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')}
      {image && (
        <img
          key={image}
          src={image}
          alt=""
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      )}
    </span>
  );
}
