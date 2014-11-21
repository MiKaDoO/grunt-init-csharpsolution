using NUnit.Framework;
using NFluent;

namespace {%= name %}.Tests
{
    [TestFixture]
    public class Tests
    {
        [Test]
        public void Should_be_true()
        {
            var heroes = "Batman and Robin";
			Check.That(heroes).Not.Contains("Joker").And.StartsWith("Bat").And.Contains("Robin");
        }
    }
}
