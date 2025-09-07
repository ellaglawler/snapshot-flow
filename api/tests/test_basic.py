def test_basic_functionality():
    """Basic test to ensure pytest can run tests."""
    assert True


def test_math_operations():
    """Test basic math operations."""
    assert 2 + 2 == 4
    assert 3 * 3 == 9


def test_string_operations():
    """Test basic string operations."""
    assert "hello" + " " + "world" == "hello world"
    assert len("test") == 4
