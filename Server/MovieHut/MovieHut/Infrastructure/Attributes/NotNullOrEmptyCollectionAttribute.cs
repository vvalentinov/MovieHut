namespace MovieHut.Infrastructure.Attributes
{
    using System.ComponentModel.DataAnnotations;

    public class NotNullOrEmptyCollectionAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var collection = value as ICollection<int>;
            if (collection != null)
            {
                return collection.Count != 0;
            }
            var enumerable = value as IEnumerable<int>;
            return enumerable != null && enumerable.GetEnumerator().MoveNext();
        }
    }
}
