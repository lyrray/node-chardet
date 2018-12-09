var assert = require('assert'),
  chardet = require('../'),
  fs = require('fs');

describe('chardet', function() {

  var path = __dirname + '/data/encodings/utf8';
  var expectedEncodingsFromPath = [
    { 'confidence': 100, 'name': 'UTF-8', 'lang': undefined },
    { 'confidence': 32, 'name': 'windows-1252', 'lang': 'fr' },
    { 'confidence': 19, 'name': 'KOI8-R', 'lang': undefined },
    { 'confidence': 10, 'name': 'Big5', 'lang': undefined },
    { 'confidence': 10, 'name': 'GB18030', 'lang': undefined },
    { 'confidence': 10, 'name': 'windows-1253', 'lang': undefined },
    { 'confidence': 6, 'name': 'windows-1250', 'lang': 'pl' },
    { 'confidence': 4, 'name': 'windows-1254', 'lang': undefined },
    { 'confidence': 2, 'name': 'windows-1251', 'lang': undefined }
  ];

  describe('#detect', function() {
    it('should detect encoding', function() {
      assert.equal(chardet.detect(fs.readFileSync(path)), 'UTF-8');
    });
  });

  describe('#detectFile', function() {
    it('should detect encoding', function(done) {
      chardet.detectFile(path, function(err, res) {
        assert.equal(err, null);
        assert.equal(res, 'UTF-8');
        done();
      });
    });

    it('should detect encoding with smaller sample size', function(done) {
      chardet.detectFile(path, { sampleSize: 32 }, function(err, res) {
        assert.equal(err, null);
        assert.equal(res, 'UTF-8');
        done();
      });
    });
  });

  describe('#detectFileSync', function() {
    it('should detect encoding', function() {
      assert.equal(chardet.detectFileSync(path), 'UTF-8');
    });

    it('should detect encoding with smaller sample size', function() {
      assert.equal(chardet.detectFileSync(path, { sampleSize: 32 }), 'UTF-8');
    });
  });

  describe('#detectAll', function() {
    it('should return a list of encodings, sorted by confidence level in decending order', function() {
      var matches = chardet.detectAll(fs.readFileSync(path));
      assert.deepEqual(matches, expectedEncodingsFromPath);
    });
  });

  describe('#detectFileAll', function() {
    it('should return a list of encodings, sorted by confidence level in decending order', function(done) {
      chardet.detectFileAll(path, function(err, res) {
        assert.equal(err, null);
        assert.deepEqual(res, expectedEncodingsFromPath);
        done();
      });
    });

    it('should return a list of encodings even with smaller sample size, sorted by confidence level in decending order', function(done) {
      chardet.detectFileAll(path, { sampleSize: 32 }, function(err, res) {
        assert.equal(err, null);
        assert.deepEqual(res, [
          { confidence: 100, name: 'UTF-8', lang: undefined },
          { confidence: 10, name: 'Shift-JIS', lang: undefined },
          { confidence: 10, name: 'windows-1252', lang: 'it' },
          { confidence: 10, name: 'windows-1250', lang: 'hu' },
          { confidence: 10, name: 'windows-1253', lang: undefined },
          { confidence: 10, name: 'windows-1251', lang: undefined }
        ]);
        done();
      });
    });
  });

  describe('#detectFileAllSync', function() {
    it('should return a list of encodings, sorted by confidence level in decending order', function() {
      var matches = chardet.detectFileAllSync(path);
      assert.deepEqual(matches, expectedEncodingsFromPath);
    });

    it('should return a list of encodings even with smaller sample size, sorted by confidence level in decending order', function() {
      var matches = chardet.detectFileAllSync(path, { sampleSize: 32 });
      assert.deepEqual(matches, [
        {'confidence': 100, 'name': 'UTF-8', 'lang': undefined},
        {'confidence': 10, 'name': 'Shift-JIS', 'lang': undefined},
        {'confidence': 10, 'name': 'windows-1252', 'lang': 'it'},
        {'confidence': 10, 'name': 'windows-1250', 'lang': 'hu'},
        {'confidence': 10, 'name': 'windows-1253', 'lang': undefined},
        {'confidence': 10, 'name': 'windows-1251', 'lang': undefined}
      ]);
    });
  });
});
