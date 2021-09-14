namespace rMind.Core.Nodes.Rows
{
    public class RowNode: Node
    {
        private readonly List<Row> _rows = new List<Row>();
        
        /// <summary>
        /// Row descriptions.
        /// </summary>
        public List<Row> Rows => _rows;

        public override string Type => "rMindHeaderRowContainer";
    }
}
