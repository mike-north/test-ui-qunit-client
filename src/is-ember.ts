export default function() {
  return (
    window &&
    typeof (window as any).require === 'function' &&
    typeof (window as any).Ember === 'object'
  );
}
