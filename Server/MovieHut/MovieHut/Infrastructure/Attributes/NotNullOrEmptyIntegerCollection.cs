namespace MovieHut.Infrastructure.Attributes
{
    using System.ComponentModel.DataAnnotations;

    public class NotNullOrEmptyIntegerCollection : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is ICollection<int> collection)
            {
                return collection.Count != 0;
            }
            return value is IEnumerable<int> enumerable && enumerable.GetEnumerator().MoveNext();
        }
    }
}
